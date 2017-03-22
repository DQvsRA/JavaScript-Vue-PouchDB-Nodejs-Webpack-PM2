const webpack = require('webpack');
const path    = require('path');

// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, '../public/javascripts');
const APP_DIR   = path.resolve(__dirname, '../src/client/pages');

const config = {
    entry:  {
        site      : APP_DIR + '/site/index.js',
        entrance  : APP_DIR + '/entrance/index.js',
        dashboard : APP_DIR + '/dashboard/index.js',
        vendor    : [
            'pouchdb',
            'pouchdb-authentication',
            'lodash',
            'semantic'
        ]
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            semantic: path.resolve('./libs/semantic/dist/semantic.js'),
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', // Specify the common bundle's name.
            filename: "vendors.bundle.js"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    module : {
        rules : [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },
            {
                test: /\.(eot|jpg|png|svg|[ot]tf|ttf|woff|woff2?)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url'
            },
            {
                test : /\.js$/,
                loader : 'babel-loader',
                include : APP_DIR,
                exclude : /node_modules/
            }
        ]
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}

module.exports = config;
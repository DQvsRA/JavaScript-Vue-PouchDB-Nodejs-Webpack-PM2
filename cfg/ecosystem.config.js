module.exports = {
/**
 * Application configuration section
 * http://pm2.keymetrics.io/docs/usage/application-declaration/
 */
apps : [
{
    name      : "ucds",
    script    : "./src/app.js",
    exec_mode : "fork",
    env: {
        NODE_ENV: "development",
    },
    env_production : {
        NODE_ENV: "production"
    },
    watch: ["./src/server"],
    watch_options: {
        persistent    : true,
        ignoreInitial : true
    },
    // ignore_watch: [""],
    log_date_format: "YYYY-MM-DD HH:mm Z",
    out_file: "./logs/nodelog.log"
}
],

/**
 * Deployment section
 * http://pm2.keymetrics.io/docs/usage/deployment/
 */
deploy : {
    production : {
        user : "node",
        host : "212.83.163.1",
        ref  : "origin/master",
        repo : "git@github.com:repo.git",
        path : "/var/www/production",
        "post-deploy" : "npm install && pm2 startOrRestart ecosystem.json --env production"
    },
    dev : {
        user : "node",
        host : "212.83.163.1",
        ref  : "origin/master",
        repo : "git@github.com:repo.git",
        path : "/var/www/development",
        "post-deploy" : "npm install && pm2 startOrRestart ecosystem.json --env dev",
        env  : {
            NODE_ENV: "dev"
        }
    }
}
};

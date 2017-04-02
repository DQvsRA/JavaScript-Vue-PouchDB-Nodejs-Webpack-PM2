const
    EXPRESS        = require('express')
,   URL            = require('url')
,   PATH           = require('path')
,   DEBUG          = require('debug')
,   LOGGER         = require('morgan')
,   BODY_PARSER    = require('body-parser')
,   COOKIE_PARSER  = require('cookie-parser')
,   COMPRESSION    = require('compression')
,   POUCHDB        = require('pouchdb')
;

const DB_URL = "/api";
POUCHDB.debug.enable('*');

const LOCAL_POUCH = POUCHDB.defaults(
{
    prefix: './db/data/'
});

const DB_UCDS = new LOCAL_POUCH('_ucds');
const DB_USERS = new LOCAL_POUCH('_users');
const DB_SESSION = new LOCAL_POUCH('_session');

// DB_UCDS.destroy();
// DB_USERS.destroy();
// DB_SESSION.destroy();

const EXPRESS_POUCH = require('express-pouchdb')(LOCAL_POUCH,
{
    configPath: "./db/config.json",
    logPath: "./db/log.txt",
    mode: 'minimumForPouchDB',
    overrideMode: {
        include: ['routes/fauxton']
    }
});

const FAUXTON_PATH = PATH.join(DB_URL, '/_utils');
const FAUXTON_INTERCEPT = function(req, res, next){
    "use strict";
    let referer = req.header('Referer');
    if (!referer) return next();
    let parsed = URL.parse(referer);
    console.log(parsed.pathname.indexOf(FAUXTON_PATH));
    if (0 === parsed.pathname.indexOf(FAUXTON_PATH)) {
        return EXPRESS_POUCH(req, res);
    }
    return next();
};

const express = EXPRESS();

const logError = DEBUG('app:error');
logError.log = console.error.bind(console);

function InitializeApp () {

    const ENV = process.env;

    // view engine setup
    express.set('port'          , ENV.PORT || 3000);
    express.set('views'         , PATH.join(__dirname, '../pages'));
    express.set('view engine'   , 'hbs');
    express.set('x-powered-by'  , false);
    express.set('ucds'          , DB_UCDS);
    express.set('users'         , DB_USERS);
    express.set('session'       , DB_SESSION);

    express.use(DB_URL, EXPRESS_POUCH);
    express.use(FAUXTON_INTERCEPT);

    express.use(LOGGER('dev'));
    express.use(COMPRESSION({level:0}));
    express.use(COOKIE_PARSER());
    express.use(BODY_PARSER.json());
    express.use(BODY_PARSER.urlencoded({ extended: false }));
    express.use(EXPRESS.static(PATH.join(__dirname, '../public')));

    require('./server/router')(express);

    // error handlers
    express.use(HandleError404); // catch 404 and forward to error handler
    express.use(HandleErrorRender); // production error handler, no stacktraces leaked to user

    express.listen(express.get('port'), function() {
        console.log('Express express listening on port ' + express.get('port'));
    });
}

function HandleError404(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function HandleErrorRender(err, req, res, next) {
    console.log("ERROR:", err.status, err.message);
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err.status });
}

InitializeApp();
module.exports = express;

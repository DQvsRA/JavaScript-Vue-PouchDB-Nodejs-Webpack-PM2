const
    site      = require('./pages/site')
,   entrance  = require('./pages/entrance')
,   dashboard  = require('./pages/dashboard')
;

const ERROR_NOT_IMPLM = 'Not Implemented';
const ERROR_WRONG_API_KEY = 'Wrong API Key';

const HEADER_API_KEY = "x-app-rest-api-key";
const HEADER_API_VALUE = "mysuperpuperapikey";

exports = module.exports = function(server)
{
     //front end
     server.route('/').get(site.render);
     server.route('/entrance').get(entrance.render);
     server.route('/dashboard').get(dashboard.render);

     // API ALL
     server.all('/api/*', function(req, res, next){
          if(req.headers[HEADER_API_KEY] && req.headers[HEADER_API_KEY] == HEADER_API_VALUE) next();
          else {
              res.status(500).send({ error: ERROR_WRONG_API_KEY });
          }
     });

     /* USERS_DB */
     // after user succesfully registered he gets a mails
    //  server.route('/api/users/register').post( users.register )
    //       .get(function(req, res, next)     { res.status(500).send({ error:ERROR_NOT_IMPLM }); })
    //       .put(function(req, res, next)     { res.status(500).send({ error:ERROR_NOT_IMPLM }); })
    //       .delete(function(req, res, next)  { res.status(500).send({ error:ERROR_NOT_IMPLM }); });
}

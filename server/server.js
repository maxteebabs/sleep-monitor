var restify = require('restify');
const corsMiddleware = require('restify-cors-middleware2');
var passport = require('passport-restify');

(async function() {
  const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: [
      'Access-Control-Allow-Origin',
      'Authorization',
      'encrypt'
    ]
  });

  var server = restify.createServer();
  server.pre(cors.preflight);
  server.use(restify.plugins.bodyParser());
  // server.use(restify.bodyParser({ mapParams: false }));
  server.use(cors.actual);
  server.use(passport.initialize());

  //our api router
  require('./routes.js')(server);

  // NO CACHE HEADERS - REQUIRED for IE browsers, useful in general
  server.pre(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.header("X-Content-Type-Options", "nosniff");
    res.header("Strict-Transport-Security", "max-age=10886400 includeSubDomains preload");
    return next()
  });

  // ERROR HANDLERS
  server.on('BadRequest', function (req, res, err, cb) {
    return cb();
  });

  server.on('Unauthorized', function (req, res, err, cb) {
    trackOnError(req, res);
    return cb();
  });

  //START SERVER
  var usePort = process.env.SERVER_PORT;
  var nodeEnv = process.env.NODE_ENV;

  server.keepAliveTimeout = 700000;

  if(!module.parent) {
    server.listen(usePort, function () {
    });
  }

  if (typeof exports === "object") {
    module.exports = server;
    // now the Mocha tests can import it!
  }

  return server;
})();

/*
Caching is also straightforward. Hapi utilises yet another module of Spumko’s, catbox, to abstract cache backends. At the time of writing, catbox caching supports a limited in-memory cache (used by default), Redis, MongoDB, Memcached and Riak.

To set up caching with our Hapi server, we’ll pass a server configuration object to the constructor containing our catbox configuration.
Install catbox-redis and add it to our dependencies via npm.
*/
var Hapi = require('hapi'),
    Joi = require('joi');

    var server = Hapi.createServer("localhost", 8080, {
      cache: {
        engine: require("catbox-redis"),
        options: {
          host: 'localhost',
          partition: "MyApp",
          password: "password"
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/{name*}',
      config: {
        validate : {
          params: {name: Joi.string().min(2).max(100).alphanum()}
        },
        handler: function(req, reply){
          reply('Hello ' + req.params.name + '!');
      }
    }
});

server.start(function(){
  console.log('Now go to localhost:8080/name and say Hello!');
});

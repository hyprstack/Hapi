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

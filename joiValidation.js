/*
Its often desirable to validate data passed to the route, especiallu so
whilst building and API. Hapi makes this easy using Joi object schema validation module.

First install Joi as a dependency with "npm install joi --save-dev"

To use Joi we need to require the module.

We use the config key in the object to express validation rules.
This is an object that allows us to split the route information form its
implementation, and allows the definition of validation rules, cache settings and more.
The config object here contains both the validate and handler object and the Joi schemas.
The handler object can either be a part of the config object or the route object.

Our validate key says the following:
The name segment of the path must be at least two characters long, and at a maximum of 100
and must be alphanumerical.
*/

var Hapi = require('hapi'),
    Joi = require('joi');

    var server = Hapi.createServer("localhost", 8080);

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

//Restart the server and make a request to localhost:8080/name:#

/*
for more information visit:
https://medium.com/@_expr/the-pursuit-of-hapi-ness-d82777afaa4b
https://github.com/spumko/joi
*/

//routing allows the server to react differently based on the HTTP
//path requested and method used. Hapi exposes routing at the highest
//level, without tangled, complex regular expressions

//To add a route to the server's routing table, we use the "route" method,
//which requires an object containing the path, method and handler keys
//at a minimum.

var Hapi = require('hapi');

var server = Hapi.createServer("localhost", 8080);

/*Path allows us to define routes to match HTTP paths that
are in compliance with RFC 3986 specification. In addition, Hapi's router provides
parameterized paths, allowing us to extract segments of a path
Examples:
  /my/path - will match requests to "http://example.com/my/path"
  my/{desc}/path - will match requests to "http://example.com/my/test/path" and
  "http://example.com/my/other/path" with "other being the value of "req.params.desc"
  /my/{name*2}/path - will match requests to "http://example.com/my/super/cool/path",
  with "super/cool" being the value of "req.params.desc" in the handler function.

The method key of the route object defines which HTTP method that route deals with.

The handler key is an object or function that specifies the aaction to be taken
when the request matches the route. More often than not the handler will be a function
with the signature "function(req, reply){...}"
*/

server.route({
  method: 'GET',
  path: '/{name*}',
  handler: function(req, reply){
    reply('Hello ' + req.params.name);
  }
});

server.start(function(){
  console.log('Now go to localhost:8080/name and say Hello!');
});

/*
for more information visit:
https://medium.com/@_expr/the-pursuit-of-hapi-ness-d82777afaa4b
*/

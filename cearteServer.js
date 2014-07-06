var Hapi = require('hapi'); //require the main Hapi module

//create a new hapi.server object set to listen
//set to listen on port 8080 on "localhost"
//and assign it to the server variable

var server = Hapi.createServer('localhost', 8080);

//make the server listen on the port and host specified when creating it
//it accepts a callback that gets executed when the server has started
//to listen for requests

server.start(function(){
  console.log('Hapi server started @ ' + server.info.uri);
});

//"server.info.uri" gives us the full uri of our server
//which should be "http://localhost:8080"

//when you run the server in your terminal with node
//"node createServer.js" you will be greeted with
//"Hapi server started @ http://localhost:8080"

//when you go to localhost:8080 in your browser you will be get
// {"statusCode":404, "error":"Not Found"}
//Since we haven't added any routes yet, there are no resources
//that can be accessed through the server

/*
for more information visit:
https://medium.com/@_expr/the-pursuit-of-hapi-ness-d82777afaa4b
*/

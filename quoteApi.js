//Example API using Hapi.
//This example takes an array of quotes and allows you to get,
//post, delete and get a ramdom quote form the array.

//This example was taken from http://blog.modulus.io/nodejs-and-hapi-create-rest-api

var Hapi = require('hapi'),
    Joi = require('joi');

var quotes = [
  {
    author: 'Audrey Hepburn'
  , text: 'Nothing is impossible, the word itself says \'I\'m possible\'!'
  }
, {
    author: 'Walt Disney'
  , text: 'You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you'
  }
, {
    author: 'Unknown'
  , text: 'Even the greatest was once a beginner. Don\'t be afraid to take that first step.'
  }
, {
    author: 'Neale Donald Walsch'
  , text: 'You are afraid to die, and you\'re afraid to live. What a way to exist.'
  }
];

var server = Hapi.createServer('localhost', 8080);

//Simulate an external module which is the correct way to express this kind of
//functionality

var quoteController = {};

quoteController.getConfig = {
  handler: function(req, reply) {
    if (req.params.id) {
      if (quotes.length <= req.params.id) return reply('No quote found.').code(404);
      return reply(quotes[req.params.id]);
    }
    reply(quotes);
  }
};

quoteController.getRandomConfig = {
  handler: function(req, reply) {
    var id = Math.floor(Math.random()*quotes.length);
    reply(quotes[id]);
  }
};

quoteController.postConfig = {
  handler: function(req, reply) {
    var newQuote = {author: req.payload.author, text: req.payload.text};
    quotes.push(newQuote);
    reply(newQuote);
  },
  validate : {
      payload: {
        author: Joi.string().required(),
        text: Joi.string().required()
    }
  }
};

quoteController.deleteConfig = {
  handler: function(req, reply) {
    if (quotes.length <= req.params.id) return reply('No quote found.').code(404);
      quotes.splice(req.params.id, 1);
      reply(true);
  }
};

//Route configuration

var routes = [
  {path: '/quote/{id?}', method: 'GET', config: quoteController.getConfig},
  {path: '/random', method: 'GET', config: quoteController.getRandomConfig},
  {path: '/quote', method: 'POST', config: quoteController.postConfig},
  {path: '/quote/{id}', method: 'DELETE', config: quoteController.deleteConfig}
];

server.route(routes);

server.start(function(){
  console.log('Listening on port 8080');
});

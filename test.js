// var server = require ('./server');  //server.js
var api = require ('./api');        //api.js
var http = require("http"); 
var url = require("url");
var fs  = require("fs");
var api = require("./api"); 
var ecstatic = require("ecstatic")({ root: __dirname + '/public'});
var Twitter = require('twitter');
var home = fs.readFileSync("./home.html").toString();

var test = require('tape');


// MOCK response object
var events = require('events'); // lets use the core node.js event emmitter
var mockresponse = new events.EventEmitter(); // gives us res.emit and req.on('data')

// res.writeHead(
mockresponse.writeHead = function(status, headers) {
  mockresponse = mockresponse || {};
  mockresponse.headers = headers;
  mockresponse.status  = status;
  return mockresponse;
}

// res.end(
mockresponse.end = function(str) {
  mockresponse = mockresponse || {};
  mockresponse.body = str;
  return mockresponse;
}

//** Tests **//

test('api.js - status code is 200', function(t){
	var pathname= "/";
	api.getTweets(mockresponse, pathname, function (response){
		t.equal(response.status, 200, 'reponse code is 200');	
		t.end();	
	});
});


test('tweets contains the string valentines', function(t){
	var pathname= "/";
	api.getTweets(mockresponse, pathname, function (response){
		var tweets = JSON.parse(response.body);
		console.log("Length:  ", tweets.statuses.length);
		for (var i = 0; i < 1; i++) {
			console.log(tweets.statuses[i].text);
			t.true(tweets.statuses[i].text.toLowerCase().indexOf('valentines') > -1, "Tweet contains word valentines");
		};	
		t.end();	
	});
});



test('tweets contains the string bmx', function(t){
	var pathname= "/";
	api.getTweets(mockresponse, pathname, function (response){
		var tweets = JSON.parse(response.body);
		console.log("Length:  ", tweets.statuses.length);
		for (var i = 0; i < 1; i++) {
			console.log(tweets.statuses[i].text);
			t.true(tweets.statuses[i].text.toLowerCase().indexOf('bmx') > -1, "Tweet contains word bmx");
		};	
		t.end();	
	});
});


// 	var m = api.getTweets(response, "/get");
// 	m();
// 	var n = response.statusCode;
// 	t.equal(n, 200);
// });


// test('tweets arr', function(t){
// 	t.plan(1);
// 	var n = tweetsArray;
// 	t.equal(n, []); 
// });


// console.log('asdf');
// api.getTweets()
// server.start();
// 	console.log(response.statusCode);

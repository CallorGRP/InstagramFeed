var http = require("http");
var url = require("url");
var fs  = require("fs");
var api = require("./api");
var ecstatic = require("ecstatic")({ root: __dirname + '/public'});
var Twitter = require('twitter');
var home = fs.readFileSync("./home.html").toString();
var port = process.env.PORT || 8000;

// var client = new Twitter({
//   consumer_key: 'oBki8VkE6KxxgUuVhZhgqgYBc',
//   consumer_secret: 'rNRyagetrcQLX0FCgyy21Br7abKh3RGgfSi2aYmIj27k8a5BaK',
//   access_token_key: '1613170598-lGarGpI41n4e0jRGdh04BusqceTxzPPvc7Quysy',
//   access_token_secret: 'POkTkYf9LArOvS51b9tBe4VR1RoFAP0XQiNkQtpfo3bet'
// });


function start(){
	http.createServer(function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		// pathnameChars = pathname.split('');
		// console.log('server.js  pathname is ' + pathname)
		// if(request.url.indexOf('.css') === -1 && request.url.indexOf('.js') === -1 ) {
		// 	console.log(" - - - - - - request :");
		// 	console.log(request);
		// 	console.log(" - - - - - - ");
		// // console.dir(request);
		// }
		console.log(">> "+pathname);
		if(pathname==="/"){
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(home);
		} else if (pathname.indexOf('getTweets') > -1){
			// example: localhost:3000/getTweets/kittens
			var pathname = pathname.split('getTweets/')[1].replace('/','');
			api.getTweets(response, pathname);
			console.log('server.js  onRequest' + pathname);

		} else if (pathname.indexOf('getInsta') > -1) {
			var pathname = pathname.split('getInsta/')[1].replace('/','');

			api.getInsta(response, pathname);
		} else	{
			ecstatic (request, response);
			//ecstatic handles all the files contained in the public folder.
		}
	}).listen(port);
  	//console.log("Server has started. http://localhost:"+port);
}

// exports.start = start;
start();

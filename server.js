var http = require("http"); 
var url = require("url");
var fs  = require("fs");
var api = require("./api"); 
var ecstatic = require("ecstatic")({ root: __dirname + '/public'});
var Twitter = require('twitter');
var home = fs.readFileSync("./home.html").toString();


var client = new Twitter({
  consumer_key: 'oBki8VkE6KxxgUuVhZhgqgYBc',
  consumer_secret: 'rNRyagetrcQLX0FCgyy21Br7abKh3RGgfSi2aYmIj27k8a5BaK',
  access_token_key: '1613170598-lGarGpI41n4e0jRGdh04BusqceTxzPPvc7Quysy',
  access_token_secret: 'POkTkYf9LArOvS51b9tBe4VR1RoFAP0XQiNkQtpfo3bet'
});


function start() {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname; 

		if(pathname=="/"){
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(home);
		} else if (pathname=="/get") {
			api.getTweets(response, pathname);
		} else {
			ecstatic (request, response);      //ecstatic handles all the files contained in the public folder. 
		}
	}

	http.createServer(onRequest).listen(8899);
  	console.log("Server has started.");
}


exports.start = start;




var Twitter = require('twitter');
var tweetsArray = [];   //create an empty array to push the tweets into
 
var client = new Twitter({
  consumer_key: 'oBki8VkE6KxxgUuVhZhgqgYBc',
  consumer_secret: 'rNRyagetrcQLX0FCgyy21Br7abKh3RGgfSi2aYmIj27k8a5BaK',
  access_token_key: '1613170598-lGarGpI41n4e0jRGdh04BusqceTxzPPvc7Quysy',
  access_token_secret: 'POkTkYf9LArOvS51b9tBe4VR1RoFAP0XQiNkQtpfo3bet'
});


function getTweets(response, pathname, callback) {
	var searchTerm = "valentines";
	var url = 'search/tweets.json?q=%23valentines&result_type=recent&count=2';
	client.get(url, function handleTweets(error, tweets) {
		if(error) throw error;
		// console.log("About to send a reponse for " + pathname);
		//note that the type is javascript, not text this time. 
		response.writeHead(200, {"Content-Type": "application/javascript"});    		
		response.end(JSON.stringify(tweets));
		// console.log("Response sent for " + pathname);
		// console.log(response.statusCode);
		if(callback !== null) {
			callback(response);	
		}
	});
}

exports.getTweets = getTweets;

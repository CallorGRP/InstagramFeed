var Twitter = require('twitter');
var tweetsArray = [];   //create an empty array to push the tweets into
 
var client = new Twitter({
  consumer_key: 'oBki8VkE6KxxgUuVhZhgqgYBc',
  consumer_secret: 'rNRyagetrcQLX0FCgyy21Br7abKh3RGgfSi2aYmIj27k8a5BaK',
  access_token_key: '1613170598-lGarGpI41n4e0jRGdh04BusqceTxzPPvc7Quysy',
  access_token_secret: 'POkTkYf9LArOvS51b9tBe4VR1RoFAP0XQiNkQtpfo3bet'
});


function getTweets(response, pathname, callback) {

	searchTerm = pathname.replace('/','').replace('#', '');

	var url = 'search/tweets.json?q=%23' + searchTerm + '&result_type=recent&count=2';
	// console.log(">> URL: "+url)
	client.get(url, function handleTweets(error, tweets) {
		if(error) {
			console.log("ERROR", error);
			// throw error;
		}

		response.writeHead(200, {"Content-Type": "application/javascript"});    		
		response.end(JSON.stringify(tweets));

		if(callback && typeof callback === 'function') {
			callback(response);	
		} else {
			// do something else?
		}


	});
}

exports.getTweets = getTweets;

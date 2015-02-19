var Twitter = require('twitter');
var tweetsArray = [];   //create an empty array to push the tweets into
var ig = require('instagram-node').instagram();

ig.use({ access_token: '38313696.8ac3169.2676a0eafcb447d391175e0cfec175e3'});
ig.use({ client_id: 'ca838b85d5c84ca786d7aef7c92bb747',
         client_secret: '7f14ce701bdf43be813695a10ecdc14a' });


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


function getInsta(response, pathname, callback){

		searchTerm = pathname.replace('/','').replace('#', '');
		console.log("search term is  " + searchTerm);

		ig.tag_media_recent( searchTerm , function(err, result, pagination, remaining, limit) {
			console.log("Result: ");
			console.log(result);
			response.writeHead(200,  {'Content-Type': 'application/javascript'});
			response.write(JSON.stringify(result));
			response.end();
		});

}

		
exports.getInsta = getInsta;

exports.getTweets = getTweets;

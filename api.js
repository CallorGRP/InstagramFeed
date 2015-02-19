var Twitter = require('twitter');
var tweetsArray = [];   //create an empty array to push the tweets into
var ig = require('instagram-node').instagram();
var insta_access_token=0;


ig.use({ access_token:insta_access_token });
ig.use({ client_id:insta_client_id ,
         client_secret:insta_client_secret});


var client = new Twitter({
  consumer_key:twit_consumer_key ,
  consumer_secret:twit_secret ,
  access_token_key:twit_access_token ,
  access_token_secret:twit_token_secret
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
			// console.log(result);
			response.writeHead(200,  {'Content-Type': 'application/javascript'});
			response.write(JSON.stringify(result));
			response.end();
		});

}


exports.getInsta = getInsta;

exports.getTweets = getTweets;

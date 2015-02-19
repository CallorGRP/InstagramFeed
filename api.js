var Twitter = require('twitter');
var tweetsArray = [];   //create an empty array to push the tweets into
var ig = require('instagram-node').instagram();
var insta_access_token=0;
var insta_client_id=0;
var insta_client_secret=0;

var twit_consumer_key=0;
var twit_secret=0;
var twit_access_token=0;
var twit_token_secret=0;


ig.use({ access_token:process.env.insta_access_token });
ig.use({ client_id:process.env.insta_client_id ,
         client_secret:process.env.insta_client_secret});


var client = new Twitter({
  consumer_key:process.env.twit_consumer_key ,
  consumer_secret:process.env.twit_secret ,
  access_token_key:process.env.twit_access_token ,
  access_token_secret:process.env.twit_token_secret
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

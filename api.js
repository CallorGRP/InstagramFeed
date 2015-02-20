var Twitter = require('twitter');
var tweetsArray = [];   //create an empty array to push the tweets into
var ig = require('instagram-node').instagram();
var mongoose = require('mongoose');

ig.use({ access_token: '38313696.8ac3169.2676a0eafcb447d391175e0cfec175e3'});
ig.use({ client_id: 'ca838b85d5c84ca786d7aef7c92bb747',
         client_secret: '7f14ce701bdf43be813695a10ecdc14a' });


var client = new Twitter({
  consumer_key: 'oBki8VkE6KxxgUuVhZhgqgYBc',
  consumer_secret: 'rNRyagetrcQLX0FCgyy21Br7abKh3RGgfSi2aYmIj27k8a5BaK',
  access_token_key: '1613170598-lGarGpI41n4e0jRGdh04BusqceTxzPPvc7Quysy',
  access_token_secret: 'POkTkYf9LArOvS51b9tBe4VR1RoFAP0XQiNkQtpfo3bet'
});

mongoose.connect('mongodb://foundrymatrix:foundrymatrix@ds039271.mongolab.com:39271/instagramfeed');

function closeMongoose(){
	mongoose.connection.close();
};

var Schema = mongoose.Schema;



var contentSchema = new Schema({
	query: String,
	data: Object
});


var TwitterResult = mongoose.model('TwitterResult', contentSchema);
var InstaResult = mongoose.model('InstaResult', contentSchema);

function getTweets(response, pathname, callback) {
	
	searchTerm = pathname.replace('/','').replace('#', '');

	var url = 'search/tweets.json?q=%23' + searchTerm + '&result_type=recent&count=20';
	// console.log(">> URL: "+url)
	client.get(url, function handleTweets(error, tweets) {
		if(error) {
			console.log("ERROR", error);
			// throw error;
		}

		response.writeHead(200, {"Content-Type": "application/javascript"});
		response.end(JSON.stringify(tweets));


		// SAVE TWEETS TO DB
		var new_tweets = new TwitterResult({
			query: searchTerm,
			data: tweets
		});

		TwitterResult.find({query: searchTerm}, function (err, tweets){
			// if (tweets.length){
			// 	console.log('This query exists!');
			// }
			// else{
			// 	console.log('This query is new');
			// }
		});

		new_tweets.save(function(err, data){
			if (err) {
				console.log("Error when saving to db:")
				console.log(err);
			}
			else {
				console.log("Saved to db:")
				console.log(data);
				// closeMongoose();

			}


		});


		if(callback && typeof callback === 'function') {
			callback(response);

			
		} else {
			// do something else?
		}


	});
	// console.log(">>CONNECTION ABOUT TO CLOSE");
	// mongoose.connection.close();
}


function getInsta(response, pathname, callback){
	// mongoose.connect('mongodb://foundrymatrix:foundrymatrix@ds039271.mongolab.com:39271/instagramfeed');

	searchTerm = pathname.replace('/','').replace('#', '');
	console.log("search term is  " + searchTerm);
	length = 0;
		
	InstaResult.find( {query: searchTerm} , function (err, dbresult){
		if (dbresult.length) {
			response.writeHead(200, {'Content-Type': 'application/javascript'});
			console.log('This query exists! Fetching it from DB');
			response.end(JSON.stringify(dbresult[0].data));					
			// response.end();

			//declearing nessecary variables to fetch newer results from the API			
			new_api_posts = [];
			updated_db_posts = [];
			latest_id = dbresult[0].data[0].id;
			console.log("Latest id: " + latest_id);
			
			// check if there are newer images in the API. 
			ig.tag_media_recent( searchTerm , function (err, result, pagination, remaining, limit) {
				console.log("Going to API to find newer results. Here are their id's:");
				
				for (i=0;i<20;i++) {
					console.log(result[i].id);
					if (latest_id === result[i].id){
						console.log("Found match: " + latest_id + " = " + result[i].id);
						break;
					} 
					else {
						new_api_posts.push( result[i] );
						if (i == 19 ){
							console.log("No match found. All images are new. Swap out all results in DB!");
						}
					}
				}

				length = new_api_posts.length;
				updated = new_api_posts.concat(dbresult[0].data);
				updated_db_posts = updated.slice(0,20);
				

				console.log("New api posts:");
				console.log(new_api_posts.length);
				console.log("Id's of new_api_posts:");
				for (j=0;j<new_api_posts.length;j ++) {
					console.log(new_api_posts[j].id);
				}

				console.log("updated_db_posts id's:");
				console.log(updated_db_posts.length);
				for (k=0;k<updated_db_posts.length;k ++){
					console.log(updated_db_posts[k].id);
				}

				//updating the database
				InstaResult.findOneAndUpdate( {query: searchTerm}, { $set: { data: updated_db_posts}}, function(err){
					console.log("error = " + err);
				
					if (length > 0) {
						console.log("Since we found new " + length + " new images in the API, we'll run getInsta() one more time, in order to serve them!");
						console.log("Here is the newest image in the database:")
						//console.log(updated_db_posts[0].images.low_resolution.url);
						//getInsta(response, searchTerm);
					} 
					else if (length == 0) {
						console.log("Did not find new images in the API, so not running getInsta() again!");
						console.log("FINISHED");
						// closeMongoose();
					}
				});
			});
		}


		// IF THE SEARCH IS NEW!!
		else {
			ig.tag_media_recent( searchTerm , function (err, result, pagination, remaining, limit) {
				console.log('This query is new. So displaying it directly from the API:');
				response.writeHead(200,  {'Content-Type': 'application/javascript'});
				response.write(JSON.stringify(result));
				response.end();

				var new_instas = new InstaResult({
					query: searchTerm,
					data: result
				});

				console.log("Saving this new search");
				new_instas.save(function (err,data){
					if (err) { 
						console.log("Error when saving to db:")
						console.log(err);
					}
					else {
						console.log("And saving it to db!")
						// closeMongoose();
					}
				});

			});
		}
	
	});	
}

exports.getInsta = getInsta;
exports.getTweets = getTweets;

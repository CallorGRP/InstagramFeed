var http = require('http');
var https = require('https');

var fs = require('fs');
var querystring = require('querystring');
var url = require('url');
var mongoose = require('mongoose');
var Cookies = require('cookies');
var ig = require('instagram-node').instagram();

ig.use({ access_token: '38313696.8ac3169.2676a0eafcb447d391175e0cfec175e3'});
ig.use({ client_id: 'ca838b85d5c84ca786d7aef7c92bb747',
         client_secret: '7f14ce701bdf43be813695a10ecdc14a' });

// connecting to the MongoDB database using mongoose
mongoose.connect('mongodb://127.0.0.1:27017/instagram_feed');


// I THOUGHT I NEEDED THE CODE BELOW, BUT FIGURED OUT I DON'T, SO I COMMENTED IT OUT.
// adding the database to a variable
//var db = mongoose.connection;
// If we recieve an error
//db.on('error', console.log('connection error');
// If the database connection opens and the database is ready to be
//db.once('open', function(callback){
//});


// Initializing a Schema
var Schema = mongoose.Schema;

// Creating a Schema. Schemas define the structure of our models.
var userSchema = new Schema({
	name: String,
	email: String,
	queries: [String]
});


// Creating a model, based on the Schema. Models lets us create instances of data that will be stored in the database.
var User = mongoose.model('User', userSchema);



// Creating the server
http.createServer(function (req,res){
	console.log("URL: ",req.url);
	// A switch statement for handling the various urls
	


	switch(req.url) {
		case '/':
			
			/* Cookie stuff:
			cookie_value = Math.floor(Math.random() * (100000 - 1)) + 1;
			console.log(cookie_value);
			cookies = new Cookies(req,res);
			cookies.set("test_cookie", cookie_value, { httpOnly: false });
			*/

			res.writeHead(200, {'Content-Type': 'text/html'});
			var readFile=fs.createReadStream('index.html');
    		readFile.pipe(res);
			break;

		case '/instagram':
			var body = '';

			https.get('https://api.instagram.com/v1/media/popular?client_id=ca838b85d5c84ca786d7aef7c92bb747', function (https_response){
				
				https_response.on('data', function(chunk){
					body+=chunk;
				});

				

				https_response.on('end', function(){
					var instaResponse = JSON.parse(body);
					console.log("Got response: ", body);
					res.writeHead(200,  {'Content-Type': 'application/javascript'});
					// res.write(JSON.stringify({ a: 1 }));
					//res.write(instaResponse.toString());
					res.write(JSON.stringify(instaResponse));
					res.end();
				});


			}).on('error', function(e) {
   			   console.log("Got error: ", e);
			});
			break;

		case '/ig':

			ig.tag_media_recent('footbal', function(err, result, pagination, remaining, limit) {
					res.writeHead(200,  {'Content-Type': 'application/javascript'});
					res.write(JSON.stringify(result));
					res.end();
				});
				



		break;
		case '/adduser':
			userdata = "";

			// Listen for the data that are passed from the user
			req.addListener('data', function(chunk){
				userdata += chunk;
				console.log("Chunk: " + chunk.toString());
			});


			// When all data is recieved, do this callback
			req.addListener('end', function(){
				// parse the data into an object
				var decodedBody = querystring.parse(userdata);

				// create a new user in the database (this is the model User, which is defined by the Schema called userSchema)
				var new_user = new User({
					name: decodedBody.name,
					email: decodedBody.email
				});

				// save the user in the database
				new_user.save(function(err, data){
					if (err) {
						console.log(err);
					} else {
						console.log(data);
					}
				});

				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write("Thanks for joining");
				res.end();
				
			});
		break;

		case '/users':
			// Fetch all the instances of the User model in the database.		
			User.find({}, function(err,users){
				res.writeHead(200, {'Content-Type': 'text/html'});
			
			// render the users' names in the DOM
				users.forEach(function(user){
					res.write(user.name + '<br/>');
				});
				res.end();
			});


		break;
	/*	default:
			res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
      		res.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
      		console.log("[404] " + req.method + " to " + req.url);*/

	}
}).listen(8080);




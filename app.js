var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var url = require('url');
var mongoose = require('mongoose');


// connecting to the MongoDB database using mongoose
mongoose.connect('mongodb://127.0.0.1:27017/test2');


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
http.createServer(function(req,res){
	console.log("URL: ",req.url);

	// A switch statement for handling the various urls
	switch(req.url) {
		case '/':
			res.writeHead(200, {'Content-Type': 'text/html'});
			var readFile=fs.createReadStream('index.html');
    		readFile.pipe(res);
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

				res.writeHead( 200, {'Content-Type': "text/html"});
				res.write('Thanks for submitting a new user');
				res.end();
				
			});
		break;


		case '/users':
			// Fetch all the instances of the User model in the database.		
			User.find({}, function(err,users){
				res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
			
			// render the users' names in the DOM
				users.forEach(function(user){
					res.write(user.name + '<br/>');
				});
				res.end();
			});


		break;
		default:
			res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
      		res.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
      		console.log("[404] " + req.method + " to " + req.url);

	}
}).listen(8080);




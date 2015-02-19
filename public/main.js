// javascript for when a user clicks a button and requests new Tweets.



$(document).ready(function(){
	console.log("ready");
	var pathname = "carrots";
	// JSON variation

	function clientGetTweets (queryTwitter) {
		$.getJSON("fm-instagram.herokuapp.com/getTweets/" + queryTwitter, function(data) {
			console.log("JSON variation - getting tweets from server");
			console.log("query twitter is " + queryTwitter); 
			console.log( "data is " + data)
			console.log("data.statuses " + data.statuses)
			console.dir(data.statuses);
			data.statuses.forEach(function(tweets){
				console.log( "" + tweets);
				$("#contentTwitter").append('<li>' + tweets.text + '</li>');
			});
			
		});
	}

	function clientGetInsta (queryInsta) {
		$.getJSON("fm-instagram.herokuapp.com/getInsta/" + queryInsta, function(data) {
			console.log("JSON variation - getting Insta from server");
			console.log("data is " + data);
			console.dir(data);
			data.forEach(function(insta){
				$("#contentInsta").append('<a href="' + insta.link  +'"><img src="' + insta.images.low_resolution.url + '">' + '</a><br/>');
			});
		});
	}


	// click functionality

	$("h1").on('click', function(){
		console.log('h1 click function fired $.getJSON');
		clientGetTweets();

	});


	$("#instabutton").on('click', function(){
		var queryInsta = $("#queryInsta").val();
		console.log('instabutton click function fired $.getJSON');
		clientGetInsta(queryInsta);

	});

	$("#twitterbutton").on('click', function(){
		var queryTwitter = $("#queryTwitter").val();
		console.log('twitter click function fired $.getJSON');
		clientGetTweets(queryTwitter);

	});



//end of jquery
console.log("finished jquery");
});

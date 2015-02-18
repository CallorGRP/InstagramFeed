// javascript for when a user clicks a button and requests new Tweets. 



$(document).ready(function(){
	console.log("ready");
	var pathname = "carrots";
	// JSON variation
	function clientGetTweets () {
		console.log("Hello from clientGetTweets() ;-)")
		$.getJSON("http://localhost:8899/getTweets/" + pathname, function(data) {
			console.log("JSON variation - getting tweets from server");
			$(".tweets-homepage").html(data.statuses[0].text);
		});


	};


	// click functionality

	$("h1").on('click', function(){
		console.log('h1 click function fired $.getJSON');
		clientGetTweets();	
		
	});

	

	

//end of jquery
console.log("finished jquery");
});




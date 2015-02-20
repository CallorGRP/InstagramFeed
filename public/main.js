// javascript for when a user clicks a button and requests new Tweets. 



$(document).ready(function(){
	console.log("ready");
	// JSON variation

	function clientGetTweets (query) {
		$.getJSON("http://localhost:8899/getTweets/" + query, function(data) {
			console.log("JSON variation - getting tweets from server");
			console.log(data);
			$(".tweets-homepage").html(data.statuses[0].text);
		});
	}

	function clientGetInsta (query) {
		$.getJSON("http://localhost:8899/getInsta/" + query, function(data) {
			console.log("JSON variation - getting Insta from server");
			console.log(data);
			data.forEach(function(insta){
				$("#content").append('<a href="' + insta.link  +'"><img src="' + insta.images.low_resolution.url + '">' + '</a><br/>');
			});	
			//$(".tweets-homepage").html(data.statuses[0].text);
		});
	}


	// click functionality

	$("#twitterbutton").on('click', function(){
		var query = $("#twitterquery").val();
		console.log('twitterbutton click function fired $.getJSON');
		if (query.length){
			$("#content").html("");
			clientGetTweets(query);	
		}
		
	});


	$("#instabutton").on('click', function(){
		var query = $("#instaquery").val();
		console.log('instabutton click function fired $.getJSON');
		if (query.length){
			$("#content").html("");
			clientGetInsta(query);	
		}
		
	});	

	

//end of jquery
console.log("finished jquery");
});




// javascript for when a user clicks a button and requests new Tweets.



$(document).ready(function(){
	console.log("ready");
	var pathname = "carrots";
	// JSON variation

	function clientGetTweets () {
		$.getJSON("fm-instagram.herokuapp.com/" + pathname, function(data) {
			console.log("JSON variation - getting tweets from server");
			$(".tweets-homepage").html(data.statuses[0].text);
		});
	}

	function clientGetInsta (query) {
		$.getJSON("fm-instagram.herokuapp.com/getInsta/" + query, function(data) {
			console.log("JSON variation - getting Insta from server");
			console.log(data);
			data.forEach(function(insta){
				$("#content").append('<a href="' + insta.link  +'"><img src="' + insta.images.low_resolution.url + '">' + '</a><br/>');
			});
			//$(".tweets-homepage").html(data.statuses[0].text);
		});
	}


	// click functionality

	$("h1").on('click', function(){
		console.log('h1 click function fired $.getJSON');
		clientGetTweets();

	});


	$("#instabutton").on('click', function(){
		var query = $("#query").val();
		console.log('instabutton click function fired $.getJSON');
		clientGetInsta(query);

	});



//end of jquery
console.log("finished jquery");
});

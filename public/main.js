// javascript for when a user clicks a button and requests new Tweets.



$(document).ready(function(){
	console.log("ready");
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
			console.log("Id of newest element:");
			//newest_id=data[0].id;
			console.log(data[0].id);
			$("#contentInsta").html("");
			data.forEach(function(insta){
				$("#contentInsta").append('<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 instagram_img_div"><a href="' + insta.link  +'"><img class="instagram_img" src="' + insta.images.low_resolution.url + '">' + '</a></div>');
			});
			setTimeout( function(){
            	console.log("3 seconds has gone. Checking for new results.")
            	checkForNewResults(queryInsta, data);
        	}, 3000)

		});	
	}

	function checkForNewResults (queryInsta, rendered_data){
	    $.getJSON("fm-instagram.herokuapp.com/getInsta/" + queryInsta, function(data) {
	        newest_rendered_id = rendered_data[0].id;
	        newest_db_id = data[0].id;
	        console.log('newest_rendered_id: ', newest_rendered_id);
	        console.log('newest_db_id: ', newest_db_id);
	        if (newest_rendered_id !== newest_db_id){
	            console.log("new stuff at the db. I'll ask again!")
	            clientGetInsta (queryInsta);
	        } else{
	            console.log("no new stuff at the db. I wont ask again!")

	        }
	    });
	}


	// click functionality

	$("#twitterbutton").on('click', function(){
		var query = $("#twitterquery").val();
		console.log('twitterbutton click function fired $.getJSON');
		if (query.length){
			$("#contentTwitter").html("");
			clientGetTweets(query);	

		}
	});



	$("#instabutton").on('click', function(){
		var query = $("#instaquery").val();
		console.log('instabutton click function fired $.getJSON');
		if (query.length){
			$("#contentInsta").html("");
			clientGetInsta(query);	
		}
		
	});	



//end of jquery
console.log("finished jquery");
});






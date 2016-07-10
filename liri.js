var keys = require('./keys.js');
var fs = require('fs');
var Twitter = require('twitter');
var command = process.argv[2];
var songName = process.argv[3];

switch(command) {
	case "my-tweets":
		getTweets();
		break;
	case "spotify-this-song":
		spotifySong();
		break;
	case "movie-this":
		getMovie();
		break;
	case "do-what-it-says":
		doRandom();
		break;
}

function getTweets() {
	var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
	});
 
	var params = {screen_name: 'nodejs'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
  	if (!error) {
    	console.log(tweets);
  	}
	});
}

	
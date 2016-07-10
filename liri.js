var keys = require('./keys.js');
var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('spotify');
var command = process.argv[2];
var songName = process.argv[3];
var movieInput = process.argv.slice(2);
var request = require('request');

switch(command) {
	case "my-tweets":
		getTweets();
		break;
	case "spotify-this-song":
		if (songName) {
			spotifySong(songName)
		} 
		else {
			spotifySong("what's my age again blink 182")
		}
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
  consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key:  keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret   
	});
 
	var params = {screen_name: 'tylerfallon'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
  	if (!error) {
    	console.log(tweets);
  	}
  	for (var i=0; i<tweets.length; i++) {
  		var myTweet = tweets[i].text + '\n' + tweets[i].created_at + '\n';
  		console.log(myTweet)
  	}
	});
}


function spotifySong(songName) {
	spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    var songInfo = data.tracks.items[0];
    var spotifyResults = 
      "Song Name: " + songInfo.name + "\n" +
      "Artist: " + songInfo.artists[0].name + "\n" +
      "Album: " + songInfo.album.name + "\n" +
      "Link: " + songInfo.preview_url + "\n";
    console.log(spotifyResults);
	});
}


function getMovie () {
var movie = movieInput[1];
var omdb = 'http://www.omdbapi.com/?t=';
var omdbTomatoe = '&y=&plot=short&r=json&tomatoes=true';
var omdbUrl = omdb + movie + omdbTomatoe;
  request(omdbUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var results = 
        "Title: " + JSON.parse(body)["Title"] + "\n" +
        "Year: " + JSON.parse(body)["Year"] + "\n" +
        "Rating: " + JSON.parse(body)["Rated"] + "\n" +
        "Country: " + JSON.parse(body)["Country"] + "\n" +
        "Language: " + JSON.parse(body)["Language"] + "\n" +
        "Plot: " + JSON.parse(body)["Plot"] + "\n" +
        "Actors: " + JSON.parse(body)["Actors"] + "\n" +
        "Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"] + "\n" +
        "Rotten Tomato URL: " + JSON.parse(body)["tomatoURL"] + "\n";
      console.log(results);
    }
  })
};
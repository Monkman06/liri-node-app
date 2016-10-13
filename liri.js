
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
// var prompt = require('prompt');
var keys = require('./keys.js')

var command = process.argv[2];
var argument = process.argv[3];
//var client = new Twitter(keys.twitterKeys)

switch (command){
  case "my-tweets":
    lookFormytweets();
    break;
  
  case "spotify-this-song":
     spotifySong(argument)
     break;

  case"movie-this":
     movie(argument)
     break;

  case "do-what-it-says":
      console.log("do-what-it-says")
      doWhat()
      break;

  default:
    console.log("Error in your request")
}

function lookFormytweets(){
var client = new twitter(keys.twitterKeys);
var params = {screen_name: 'ptkcpt2012'};
client.get('statuses/user_timeline', params, function(error,tweets,response){
  if (!error){
    for (var i=0; i<tweets.length; i++){
      console.log(tweets[i].text);
    }
  }else{
    console.log(error);
  }
});

};

function spotifySong(argument){ 
  var songtopass;
    if(argument === undefined){
      songtopass = "the sign";
    }else{
      songtopass = argument;
    };
    console.log(songtopass);

  spotify.search({type:'track', query: songtopass}, function(error, data){
    console.log('"the sign" by ace of base');
    console.log(data);

    for (var i = 0; i<data.tracks.items.length; i++){
      console.log(data.tracks.items[i].artists[0].name);
      console.log(data.tracks.items[i].name);
      console.log(data.tracks.items[i].preview_url);
      console.log(data.tracks.items[i].album.name);
    };
  });
};

function movie(argument){
  console.log("hi");

var movieTitle;

   if(argument === undefined){

    movieTitle = "Mr.Nobody";

  }else{
    movieTitle = argument;
  };

  request("http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&r=json&tomatoes=true", function(err, response, body){
     if(!err && response.statusCode == 200){
      body = JSON.parse(body);
      console.log("Title: " + body.Title);
      console.log("Year: " + body.Year);
      console.log("IMDB RATING: "+ body.imdbRating);
      console.log("County: "+ body.Country);
      console.log("Plot " + body.Plot);
      console.log("Actors: " + body.Actors);
     };
    });
   };
function doWhat(){
  fs.readFile('random.txt', "uft8", function(error, data){
    console.log(data);

    textArray = data.split(',');

  })
};


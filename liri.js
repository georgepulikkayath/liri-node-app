require('dotenv').config();
var keys = require("./keys.js");
var axios=require("axios");
var fs=require("fs");
 var moment=require("moment");
var Spotify=require("node-spotify-api");
var aCommand=process.argv[2];
var uSearch=process.argv.slice(3).join("");

function liriapp(aCommand,uSearch){
   
    switch(aCommand){
        case "movie-this":
        getMovie(uSearch);
        break;
        case "spotify-this-song":
        getSpotify(uSearch);
        break;
        case "concert-this":
        getConcert(uSearch);
        break;
        case "do-what-it-says":
        getdoWhat();
        break;
        default:
        console.log("Enter a valid input");
    }
}
function getMovie(mname){
    

    
    if(!mname){
        mname= "mr.Nobody";
     }
    
     var mquery="http://www.omdbapi.com/?t="+mname+"&y=&plot=short&apikey=trilogy";
    axios.request(mquery).then(
        function(response){
          console.log("..........................");
          console.log("title:"+response.data.Title+"\n");
          console.log("year:"+response.data.Year+"\n");
          console.log("imdbrating:"+response.data.imdbRating+"\n");
          console.log("Rotten tomatoes rating:"+response.data.Ratings[1].Value+"\n");
          console.log("Country where produced:"+response.data.Country+"\n");
          console.log("Language:"+response.data.Language+"\n");
          console.log("Plot:"+response.data.Plot+"\n");
          console.log("Actors:"+response.data.Actors+"\n");
        }
    );
}
function getSpotify(sname){
  
    var spotify = new Spotify(keys.spotify);
    
    if(!sname){
        sname="The Sign";
    }
    spotify.search({ type: 'track', query: sname },function(err,data){
     
        
        if ( err ) {
           return console.log('Error occurred: ' + err);
            
        }
        console.log("----------------------");
        console.log("Artist(s) name:"+data.tracks.items[0].album.artists[0].name+"\n");
        console.log("song name:"+data.tracks.items[0].name+"\n");
        console.log("song preview link:"+data.tracks.items[0].href+"\n");
        console.log("album:"+data.tracks.items[0].album.name+"\n");
    });
}
function getConcert(band){
    
    if(band==""){
        console.log("Enter an artist name after concert-this");
    }
    artist=band;
    var bquery="https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(bquery).then(
        function(response){
         console.log("--------------------");
         console.log("Name of the venue:"+response.data[0].venue.name+"\n");
         console.log("venue location:"+response.data[0].venue.city+"\n");
         console.log("Date of the event:"+moment(response.data[0].datetime).format("MM-DD-YYYY")+"\n");
          });


}

function getdoWhat(){
   fs.readFile("random.txt","utf8",function(error,data){
       if(error){
           return console.log("error");
       }
       else{
           var value=data.split(",");
           liriapp(value[0],value[1]);
       }
   });

}
liriapp(aCommand,uSearch);
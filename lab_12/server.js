var express = require('express');
var app = express();
var SpotifyWebApi = require('spotify-web-api-node');
 app.use(express.static('public'))

var spotifyApi = new SpotifyWebApi({
    clientId:'1bd3fed0a3df4d8085dfc9b694fbfce7',
    clientSecret:'1648e97abed442918092dcb80b2c9b4f'

}); 

app.get('/', function(req, res){
 res.send("Hello world! by express");
});

//SPOTIFY API SETUP

// Retrieve an access token
spotifyApi.clientCredentialsGrant().then(
    function (data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);


    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
    },

    //Abort if an error is detected
    function (err) {
    console.log(
    'Something went wrong when retrieving an access token',
    err.message
    );
    }
   );
 async function getTracksAPI(searchterm, res) {
    spotifyApi.searchTracks(searchterm)
    .then(function (data) {
    //first lets get the tracks.
    //these are stored in the
    //JSON under an array called Items
    var tracks = data.body.tracks.items
    //lets set up a empty json array
   //to act as the response
    var JSONResponse = [];
    //now lets run through all the items
    //this is a for loop

    for(var i=0; i<tracks.length;i++)
    {
    var track = tracks[i];
   //here we push the details we need about this track to the array
    JSONResponse.push(
    {
    trackname:track.name,
    artist:track.artists[0].name,
    image:track.album.images[0].url,
    url:track.external_urls.spotify,
    }
    );
    }
    res.send(JSONResponse)
    }, function (err) {
    console.error(err);
    });
   }

   //ASYNC FUNCTION     
   async function getTracks(searchterm,res) {

    spotifyApi.searchTracks(searchterm)
    .then(function (data) {
    var tracks = data.body.tracks.items
    //lets set up a empty string to act as the response
    var HTMLResponse = "";
    //now lets run through all the items
    //this is a for loop
    for(var i=0; i<tracks.length;i++){
   
    var track = tracks[i];
    console.log(track.name);
    HTMLResponse = HTMLResponse +
    "<div>" +
    "<h2>"+track.name+"</h2>"+
    "<h4>"+track.artists[0].name+"</h4>"+
    "<img src='"+track.album.images[0].url +"'>"+
    "<a href='"+track.external_urls.spotify+"'> Track Details </a>"+
    "</div>";
    console.log(HTMLResponse);
    }
    res.send(HTMLResponse)
    }, function (err) {
    console.error(err);
    });

}

// New async function to get toptracks
async function getTopTracks(artist, res) {
    spotifyApi.getArtistTopTracks(artist,'GB')
    .then(function (data) {
    console.log(data.body);
    }, function (err) {
    console.log('Something went wrong!', err);
    });
   }

  







   //SEARCHTEM LOVE

   //Route for love in tracks, artists and albums 

   app.get('/searchLove', function(req, res){
    getTracks('love',res)
   });

   //Route for serach html 
   app.get('/search', function(req,res){
    var searchterm= req.query.searchterm;
    getTracks(searchterm,res)
   });

   //Route for top artists 
   app.get('/top-tracks', function(req,res){
    var artistID= req.query.artistID;
    if(!artistID){
        res.send("No id given m8");
        getTopTracks(artistID,res);
    }
   })







app.listen(8080);


var express = require('express');
var app = express();
var SpotifyWebApi = require('spotify-web-api-node');
 app.use(express.static('public'))

var spotifyApi = new SpotifyWebApi({
    clientId:'1bd3fed0a3df4d8085dfc9b694fbfce7',
    ClientSecret:'1648e97abed442918092dcb80b2c9b4f'

}); 

app.get('/', function(req, res){
 res.send("Hello world! by express");
});

//SPOTIFY API SETUP

// Authenticate with Spotify and retrieve access token
spotifyApi.clientCredentialsGrant().then(
    function (data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token
        spotifyApi.setAccessToken(data.body['access_token']);
    },
    function (err) {
        console.log('Something went wrong when retrieving an access token', err.message);
    }
);



   //ASYNC FUNCTION     
   async function getTracks(searchterm,res) {

    spotifyApi.searchTracks(searchterm)
    .then(function(data){
        res.send(JSON.stringify(data.body));

    }, function(err){
        console.log(err);
    });
    
   }

   //SEARCHTEM LOVE

   //Route for love in tracks, artists and albums 

   app.get('/searchLove', function(req, res){
    getTracks('love',res)
   });








app.listen(8080);

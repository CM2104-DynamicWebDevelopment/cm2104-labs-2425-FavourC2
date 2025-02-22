var express = require('express');
var app = express();
var SpotifyWebApi = require('spotify-web-api-node');
 app.use(express.static('public'))

var spotifyApi = new SpotifyWebApi({
    clientId:'1bd3fed0a3df4d8085dfc9b694fbfce7',
    ClientSecret:'d42ef9be6b064be09078c7c93782c515'

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

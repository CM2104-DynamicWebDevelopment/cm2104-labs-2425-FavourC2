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


   //ASYNC FUNCTION     
   async function getTracks(searchterm,res) {

    spotifyApi.searchTracks(searchterm)
    .then(function(data){
        var tracks = data.body.tracks.items
        //lets set up an empty string to act as the response
        var HTMLResponse ="";
        //now lets run through all the items
        //this is a for loop 
        for(var i=0; i <tracks.length; i++){
            var track = tracks[i]
            console.log(track.name);
            HTMLResponse= HTMLResponse + "<div>" +
            "<h2>" + track.name + "</h2>" +
            "<h4>" + track.artist[0].name + "</h4>" +
            "<img src = '"+ track.album.images[0].url +"'> " +
            "<a href= '"+track.external_urls.spotify+"'> track details  </a>" +
            "</div>";
            console.log(HTMLResponse)
        }


        res.send(HTMLResponse);

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

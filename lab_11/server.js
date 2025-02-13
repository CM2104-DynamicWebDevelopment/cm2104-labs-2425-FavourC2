var express = require('express');
var app = express();
var knockknock = require('knock-knock-jokes');


app.get('/', function(req, res){
    res.send("Hello world! by express");


});

app.get("/test", function(req, res){
    res.send("Hello this is route 2");
    
});

app.get('/joke', function (req, res){
    var randomJoke = knockknock();
    res.send(randomJoke);

});

app.listen(8080);
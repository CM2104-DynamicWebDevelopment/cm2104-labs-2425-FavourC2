var express = require('express');
var app = express();


app.get('/', function(req, res){
    res.send("Hello world! by express");


});

app.get("/test", function(req, res){
    res.send("Hello this is route 2");
    
});

app.get('/add' , function(req,res){
    var x = parseInt(req.query.x, 10)
    var y = parseInt(req.query.y, 10);

    if(isNaN(x) ||isNaN(y)){
    res.send("Invalid input. Please provide numbers for x and y.");
    }else{
       res.send("X + Y =" + (x+y));  
    }
   


});


app.listen(8080);
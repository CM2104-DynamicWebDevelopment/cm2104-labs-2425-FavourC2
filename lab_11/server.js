var express = require('express');
var app = express();


app.get('/', function(req, res){
    res.send("Hello world! by express");


});

app.get("/test", function(req, res){
    res.send("Hello this is route 2");
    
});

app.get('/add' , function(req,res){
    var x = parseInt(req.query.x);
    var y = parseInt(req.query.y);

    if(isNaN(x) ||isNaN(y)){
    res.send("Invalid input. Please provide numbers for x and y.");
    }else{
       res.send("X + Y =" + (x+y));  
    }
   


});

app.get('/calc', function(req,res){
    var x = parseInt(req.query.x);
    var y = parseInt(req.query.y);
    var operator = req.query.operator;

    var result;
    
    switch(operator){
        case "add":
        result = x + y;
        res.send(result);
        return;

        case "sub":
        result = x - y;
        res.send(result);
        return;

        default:
            res.send("Invalid operator. Use 'add' or 'sub'.");
            return;

    }
    
});


app.listen(8080);
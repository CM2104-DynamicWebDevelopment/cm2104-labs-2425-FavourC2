var express = require('express');
var app = express();
app.use(express.static('public'))

//Because we are needing to parse the form data to be readable, we need to add one more line. Include this line after your earlier app.use (app.post)
app.use(express.urlencoded({extended:true}))


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
        res.send(`Result: ${result}`);
        return;

        case "sub":
        result = x - y;
        res.send(`Result: ${result}`);
        return;

        case "mul":
        result = x*y;
        res.send(`Result: ${result}`);
        return;

        case "div":
            result = x/y;
            res.send(`Result: ${result}`);
            return;

        

        default:
            res.send("Invalid operator. Use 'add', 'sub', 'mul' or 'div'.");
            return;

    }
    
});

// static files for name and quest could be used as basic login page 
app.get('/getform', function(req,res){
    var name = req.query.name;
    var quest = req.query.quest;
    res.send("Hi "+name+" I am sure you will "+quest) ;

});

//What happens when you need to send sensitive information such as passwords? You don’t want this to be visible in the url. This is when you use a Post request (App.post)
app.post('/postform', function(req,res){
    var name = req.body.name;
    var quest = req.body.quest;
    res.send("Hi  " +name+ " I am sure you will"+ quest);

});






app.listen(8080);
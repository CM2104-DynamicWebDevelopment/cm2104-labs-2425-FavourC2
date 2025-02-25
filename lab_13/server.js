const MongoClient = require('mongodb-legacy').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(ur);
const dbname ='star_wars_quotes';

//code to link to the express mosule
const express = require('express');
const app = express();

//code to define the public folder
app.use(express.static('public'));

var db;

//run the connect method
connectDB();

async function connectDB(){
 //Use connect method to connect to the server
 await client.connect();
 console.log('Connected suffesfully to the server');
 db = client.db(dbname);
 //Everything is good lets start

 app.get('/all', function(req, res) {
    db.collection('quotes').find().toArray(function(err, result) {
    if (err) throw err;
    var output = "<h1>All the quotes</h1>";
    for (var i = 0; i < result.length; i++) {
    output += "<div>"
    output += "<h3>" + result[i].name + "</h3>"
    output += "<p>" + result[i].quote + "</p>"
    output += "</div>"
    }
    res.send(output);
    });
   });
 app.listen(8080);
}
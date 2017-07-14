const fs = require("fs");
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use (bodyParser.json());
//const router = express.Router();
// const foodRoutes = require("./routers/foods.js");
// const dogRoutes = require("./routers/dogs.js");
const buzzWordsArray = [];
const objectArray = [];



var html = app.use(express.static('public/'));


app.get("/", (req, res)=>{
  res.send(html);
});

app.post("/buzzword", (req, res)=>{
  if(buzzWordsArray.indexOf(req.body.buzzword) !== -1){
    res.send({"success": false});

  }else{
    objectArray.push(req.body);
    buzzWordsArray.push(req.body.buzzword);
    res.send({"success": true});
   }

});

app.get("/buzzwords", (req, res)=>{
  res.json({"buzzwords": buzzWordsArray});
});


app.put('/buzzword', (req, res)=>{
for(var i = 0; i < objectArray.length; i++){
  if(objectArray[i].buzzword === req.body.buzzword){
   res.send({"failed": false});
  }else{
    res.send({"failed": true});
  }
  }
});


const server = app.listen(3000, ()=>{
  var host = server.address().address;
  var post = server.address().port;

  console.log(`Server running on ${host}, at post ${post}`);
});
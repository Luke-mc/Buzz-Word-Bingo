const fs = require("fs");
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use (bodyParser.json());
const buzzWordsArray = [];
var objectArray = [];
var html = app.use(express.static('public/'));


app.get("/", (req, res)=>{
  res.send(html);
});

app.post("/buzzword", (req, res)=>{
  if(buzzWordsArray.indexOf(req.body.buzzword) !== -1){
    res.send({"success": false});
  }else{
    req.body.heard = false;
    objectArray.push(req.body);
    buzzWordsArray.push(req.body.buzzword);
    res.send({"success": true});
   }
});

app.get("/buzzword", (req, res)=>{
  res.json({"buzzwords": objectArray});
});

app.put('/buzzword', (req, res)=>{
  for(var i = 0; i < objectArray.length; i++){
      if(objectArray[i].buzzword === req.body.buzzword){
        var currentNum = parseInt(objectArray[i].points);
        var newNum = parseInt(req.body.points);
        var number = currentNum += newNum;
        objectArray[i].heard = true;
        res.send({"success": true, newScore: number});
      }else{
         res.send({"succes": false});
      }
   }
});

app.delete('/buzzword', (req, res)=>{
  for(var i = 0; i < objectArray.length; i++){
      if(objectArray[i].buzzword === req.body.buzzword){
          var index = objectArray.indexOf(objectArray[i]);
          objectArray.splice(index,1);
          res.send({"success": true});
          }else{
         res.send({"success": false});

      }
   }
});

app.post("/reset", (req,res)=>{
 objectArray =[];
 res.send({"success": true});
 });

const server = app.listen(3000, ()=>{
  var host = server.address().address;
  var post = server.address().port;

  console.log(`Server running on ${host}, at post ${post}`);
});


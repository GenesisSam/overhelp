var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var axios = require('axios');

var server = app.listen(3000, function(){
 console.log("Express server has started on port 3000")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));

app.get("/overhelp", (req, res) => {
  try{
    axios.get("https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=out%20of%20range&site=stackoverflow&filter=!b0OfNFICOao(Ho")
    .then((response) => {
      console.log(response.data);
      res.json({
        data: response.data
      })
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
  } catch(err) {
    console.log(err);
    res.json(err);
  }
});


// var router = require('./router/main')(app, fs);

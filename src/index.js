var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var server = app.listen(3030, function(){
 console.log("Express server has started on port 3030")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var router = require("./routes")(app);

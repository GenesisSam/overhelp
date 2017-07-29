var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var router = require("./routes")(app);

var server = app.listen(3030, () => {
  console.log("Express server has started on port 3030");
});

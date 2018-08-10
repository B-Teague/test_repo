// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// get request for all parameters after base URL
app.get("/*", function (request, response) {
  var date = {
  "unix": null,
  "natural": null
};
  var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let path = decodeURIComponent(request.path.substring(1, request.path.length));
  if(isNaN(path)){
    let unixDate = Date.parse(path) / 1000;
    if(!isNaN(unixDate)){
      date.unix = unixDate;
      date.natural = path;
    }
  }
  else {
    let naturalDate = new Date(parseInt(path) * 1000);
    date.unix = path;
    date.natural = month[naturalDate.getMonth()] + " "
     + naturalDate.getDate() + ", " + naturalDate.getFullYear();
  }
  response.send(date);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

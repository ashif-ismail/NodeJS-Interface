var express = require('express');
var request = require("request");
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.get('/', function(request, response) {
  response.send('We Dont Reply for GET/,make a POST/ instead');
});

app.post('/',
  bodyParser.urlencoded({ extended: true }),
  function(req, res) {
        var content = req.body.content;
        var from_number = req.body.from_number;
        console.log('making request to offlinebrowser-web with body as ' + content + ' and sender as ' + from_number );
        request("http://offlinebrowser-web.appspot.com/ExtractServlet?url=http://"+content+"&OutputType=1&ExtractorType=1", function(error, response, data) {
        console.log('backend response : ' + data);
        console.log('initiating sending reply to user');
        res.status(200).end();
		 });
  });
console.log('now i\'m after post scope');
app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
     });

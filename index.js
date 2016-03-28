var express = require('express');
var request = require("request");
var bodyParser = require('body-parser');
var app = express();
var content;
var from_number;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.get('/', function(request, response) {
  response.send('We Dont Reply for GET/,make a POST/ instead');
});

app.post('/',
  bodyParser.urlencoded({ extended: true }),
  function(req, res) {
        content = req.body.content;
        from_number = req.body.from_number;
        console.log('making request to offlinebrowser-web with URL as ' + content + ' and sender as ' + from_number );
        request("http://offlinebrowser-web.appspot.com/ExtractServlet?url=http://"+content+"&OutputType=1&ExtractorType=1", function(error, response, data) {
        console.log('backend response : ' + data);
        console.log('initiating response module');
        request("http://smshorizon.co.in/api/sendsms.php?user=coderx&apikey=6S019YDzKcBmDqICaH5G&mobile="+from_number"&message="+data"&senderid=MYTEXT&type=txt"+from_number, function(error, response, body) {
        });
        res.status(200).end();
		 });
  });
app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
     });

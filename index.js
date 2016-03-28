var express = require('express');
var request = require("request");
var bodyParser = require('body-parser');
var app = express();
var userName = "abdulashif";
var passWord = "sZd5y6AA";
var senderID = "CDMLAB";
var content;
var from_number;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.get('/', function(request, response) {
  response.send('We Dont Reply for GET/,make a POST/ instead..!');
});

app.post('/',
  bodyParser.urlencoded({ extended: true }),
  function(req, res) {
        content = req.body.content;        // Parameters passed as POST Request from my Android App
        from_number = req.body.from_number;
        console.log('making request to offlinebrowser-web with URL as ' + content + ' and sender as ' + from_number );
        request("http://offlinebrowser-web.appspot.com/ExtractServlet?url=http://"+content+"&OutputType=1&ExtractorType=1", function(error, response, data) {
        console.log('backend response : ' + data); //logs to console the valid output of GET Request
        console.log('initiating response module'); 
        request("193.105.74.159/api/v3/sendsms/plain?user="+userName+"&password="+passWord+"sZd5y6AA&sender="+senderID+"&SMSText="+data+"&type=longsms&GSM="+from_number+", function(error, response, body)
        //making a GET request to the above link in browser,perfectly sends an SMS,but here doesnt work!
        {
            console.log(body); //this line logs undefined to the console
        });
        res.status(200).end();
        });
  });
app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
     });

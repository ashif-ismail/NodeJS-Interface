var express = require('express');
var request = require("request");
var bodyParser = require('body-parser');
var app = express();
var userName = "abdulashif";
var passWord = "sZd5y6AA";
var senderID = "CDMLAB";
var trimmedData;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.get('/', function(request, response) {
  response.send('We Dont Reply for GET/,make a POST/ instead..!');
});

app.post('/',
  bodyParser.urlencoded({ extended: true }),
  function(req, res) {
        var content = req.body.content;    //Parameters passed as POST Request from Android
        var from_number = req.body.from_number;
        console.log('making request to offlinebrowser-web with URL as ' + content + ' and sender as ' + from_number );
        request(content, function(error, response, data) {
        console.log('backend response : ' + data);
        //logs to console the valid output of GET Request
        console.log('initiating response module'); 
        trimmedData = data.slice(0,1000);
        request("http://193.105.74.159/api/v3/sendsms/plain?user="+userName+"&password="+passWord+"&sender="+senderID+"&SMSText="+trimmedData+"&type=longsms&GSM="+from_number, function(error, response, body)
        //making a GET request to the above link in browser,perfectly sends an SMS,but here doesnt work!
        //I have solved this problem by just pre fixing the API URI with a http://
        {
            console.log(body); //this line logs errors,if any for the second GET request
        });
        res.status(200).end();
        });
  });
app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
     });

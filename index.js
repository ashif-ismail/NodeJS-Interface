var express = require('express');
var request = require("request");
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.get('/', function(request, response) {
  response.send('GET IS CHEAP,TRY POST INSTEAD !!');
});
var bodyParser = require('body-parser');
app.post('/telerivet/webhook',
  bodyParser.urlencoded({ extended: true }),
  function(req, res) {

        var content = req.body.content;
        var from_number = req.body.from_number;
        console.log('making request to offlinebrowser-web with body as ' +content +'and sender as ' + from_number );
    
    	request("http://offlinebrowser-web.appspot.com/ExtractServlet?url=http://"+content+"&OutputType=2&ExtractorType=1", function(error, response, data) {
     console.log('backend response : ' + data);
            console.log('initiating sending reply to user');
    request("193.105.74.159/api/v3/sendsms/plain?user=abdulashif&password=sZd5y6AA&sender=CDMLAB&SMSText="+data+"&type=longsms&GSM="+from_number, function(error, response, body) {
        
  });
       res.status(200).end();
		 });
  }
	);
	  app.listen(app.get('port'), function() {
     console.log('Node app is running on port', app.get('port'));
     });

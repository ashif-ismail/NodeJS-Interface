var express = require('express');
var request = require("request");
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.get('/', function(request, response) {
  response.send('Hello Cruel World!You Are Not Supposed to see this,This Page is just a response to your browsers GET request to our node app,please install offline browser for android to browse internet through SMS');
});
var bodyParser = require('body-parser');
var WEBHOOK_SECRET = "R4UKGZ47LNRZA97EG32KU7U9T769P6EG";
app.post('/telerivet/webhook',
  bodyParser.urlencoded({ extended: true }),
  function(req, res) {
      var secret = req.body.secret;
      if (secret !== WEBHOOK_SECRET) {
          res.status(403).end();
          return;
      }
      if (req.body.event == 'incoming_message') {
        var content = req.body.content;
        var from_number = req.body.from_number;
	    var phone_id = req.body.phone_id;
	  }
    	request("http://offlinebrowser-web.appspot.com/ExtractServlet?url=http://"+content, function(error, response, data) {
        // do something with the message, e.g. send an autoreply
    //     res.json({
		// 	 messages: [
    //         { content:" " + data}
    //       ]
		// });
    var len = data.length;
    var chunks = [];
    var chunkSize = 160;
    while (data) {
    if (len < chunkSize) {
        chunks.push(str);
        break;
    }
    else {
        chunks.push(str.substr(0, chunkSize));
        str = str.substr(chunkSize);
    }
}
    for(var i=0;i<len;i+=160)
    request("http://ancient-lowlands-31895.herokuapp.com/?uid=9947753535&pwd=thepassword&to="+from_number+"&msg="+chunks, function(error, response, body) {
  });
       res.status(200).end();
		 });
  }
	);
	  app.listen(app.get('port'), function() {
     console.log('Node app is running on port', app.get('port'));
     });

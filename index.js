var express = require('express');
var telerivet = require('telerivet');
var tr = new telerivet.API(qtK22ZTspOIchvK4mQ3gphD3tK8kZJ6O);
var project = tr.initProjectById(PJ47fdcdfbfe54700f);
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

var bodyParser = require('body-parser');

var WEBHOOK_SECRET = "62DZWMCCFFHTTQ44CG3WUQ94CTT7GAAN";

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
        
        // do something with the message, e.g. send an autoreply
            project.sendMessage({
               content: "hello world", 
              to_number: "+919947753535"
                  }, function(err, message) {

});
        
      }  
      
      res.status(200).end();
  }
);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

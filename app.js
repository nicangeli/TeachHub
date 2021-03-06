
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , teacher = require('./routes/teacher')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/teacher/signup', teacher.signup);
app.post('/teacher/signedup', teacher.signedup)
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.post('/sendMessage', routes.sendMessage);
app.get('/thanksContact', routes.thanksContact);

app.get('/search', teacher.search);
app.post('/search', teacher.results);
app.get('/thanks', teacher.thanks);
app.post('/call/:number', teacher.call)

app.get('/twilio.xml', routes.xml);
app.post('/twilio.xml', routes.xml);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

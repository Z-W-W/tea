
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    mongoskin = require('mongoskin'),
    dbUrl = process.env.MONGOLAB_URI || 'mongodb://@localhost:27017/chess',
    db = mongoskin.db(dbUrl, {safe: true}),
    collections = {
        Teachers: db.collection('Teachers'),
        TeacherSchedules: db.collection('TeacherSchedules')
    };

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

var app = express();
app.locals.appTitle = 'Chess';

app.use(function(req, res, next) {
    if (!collections.Teachers || ! collections.TeacherSchedules) return next(new Error("No collections."));
    req.collections = collections;
    return next();
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(allowCrossDomain);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Pages and routes
app.get('/', routes.index);
app.get('/teachers', routes.teacher.list);

// REST API routes
app.get('/rest/teachers', routes.teacher.list);
//app.get('/rest/teacherschedules', routes.teacherschedule)


app.all('*', function(req, res) {
    res.send(404);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

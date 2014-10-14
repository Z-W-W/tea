/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    models = require('./models'),
    dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/chess',
    db = mongoose.connect(dbUrl, {safe: true});

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
app.locals.appTitle = "Chess";

app.use(function(req, res, next) {
    if (!models.teacher) return next(new Error("No models."));
    req.models = models;
    return next();
});


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/public');
app.set('view engine', 'jade');
app.use(allowCrossDomain);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Pages and routes
app.get('/', routes.index);
app.get('/teachers', routes.teacher.show);
app.get('/teacherschedule', routes.teacherschedule.list);

// REST API routes
app.get('/api/teachers', routes.teacher.list);
app.post('/api/teacher', routes.teacher.add);
app.put('/api/teacher', routes.teacher.update);

app.get('/api/courses', routes.course.list);
app.post('/api/course', routes.course.add);

app.get('/api/teacherschedule', routes.teacherschedule.list);
app.get('/api/teacherschedule/teacherid=:teacherID&courseid=:courseID', routes.teacherschedule.byTeacherIDCourseID);
//app.post('/api/teacherschedule', routes.teacherschedule.add);



app.all('*', function(req, res) {
    res.send(404);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

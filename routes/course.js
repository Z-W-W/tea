/**
 * Created by hawang on 10/10/14.
 */

/*
 * GET course listing.
 */

exports.list = function(req, res){
    req.models.course.list(function(error, courses) {
        if (error) return next(error);
        res.send(courses);
    });
};

/*
 * POST course API to create a new course
 */

exports.add = function(req, res, next) {
    if (!req.body.course) return next(new Error('No course payload.'));
    var course = req.body.course;
    req.models.course.create(course, function(error, courseResponse){
        if (error) return next(error);
        res.send(courseResponse);
    });
};
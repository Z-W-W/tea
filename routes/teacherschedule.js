/**
 * Created by hawang on 10/1/14.
 */

/*
 * GET teacher schedule by teacherID and courseID
 */

exports.byTeacherIDCourseID = function(req, res){
    req.models.teacherschedule.findByTeacherIDCourseID(
        req.params.teacherID,
        req.params.courseID,
        function(error, schedule){
            if(error) return next(error);
            res.send(schedule);
        }
    );
};

/*
 * POST schedule API to create a new schedule
 */

exports.add = function(req, res, next) {
    if (!req.body.teacherschedule) return next(new Error('No teacher schedule payload.'));
    var teacherschedule = req.body.teacherschedule;
    req.models.teacherschedule.create(teacherschedule, function(error, teacherScheduleResponse){
        if (error) return next(error);
        res.send(teacherScheduleResponse);
    });
};

/*
 * GET all schedules
 */

// TODO: need to check user's privilege
exports.list = function(req, res){
    req.models.teacherschedule.list(function(error, teachers) {
        if (error) return next(error);
        res.send(teachers);
    });
};
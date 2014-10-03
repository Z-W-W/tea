/**
 * Created by hawang on 10/1/14.
 */
/*
 * GET teacher schedule
 */

//TODO: need to provide API to get schedule by teacherID and courseID
exports.list = function(req, res){
    req.models.teacherschedule.list(function(error, teachers) {
        if (error) return next(error);
        res.send(teachers);
    });
};
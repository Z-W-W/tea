/*
 * GET teacher listing.
 */

exports.list = function(req, res){
    req.models.teacher.list(function(error, teachers) {
        if (error) return next(error);
        res.send(teachers);
    });
};

/*
 * POST teacher API.
 */

exports.add = function(req, res, next) {
    if (!req.body.teacher) return next(new Error('No teacher payload.'));
    var teacher = req.body.teacher;
    req.models.teacher.create(teacher, function(error, teacherResponse){
        if (error) return next(error);
        res.send(teacherResponse);
    });
};
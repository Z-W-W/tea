exports.show = function(req, res){
    res.render('teacher_level.html');
};

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
 * POST teacher API to create a new teacher profile
 */

exports.add = function(req, res, next) {
    if (!req.body.teacher) return next(new Error('No teacher payload.'));
    var teacher = req.body.teacher;
    req.models.teacher.create(teacher, function(error, teacherResponse){
        if (error) return next(error);
        res.send(teacherResponse);
    });
};

/*
 * PUT teacher API to update an existing teacher profile
 */

exports.update = function(req, res, next) {
    if (!req.body.teacher) return next(new Error('No teacher payload.'));
    var teacher = req.body.teacher;
    req.models.teacher.findOneAndUpdate(
        {Email: teacher.Email},
        {Description: teacher.Description},
        function (error, teacherResponse){
            res.send(teacherResponse);
        }
    );
};

/*
 * DELETE teacher API to update an existing teacher profile
 */

exports.delete = function(req, res, next) {

}
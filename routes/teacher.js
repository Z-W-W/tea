/*
 * GET teacher listing.
 */

/*
exports.list = function(req, res, next) {
    req.collections.Teachers.find({}).toArray(function(error, teachers) {
        if (error) return next(error);
        res.send(teachers);
    });
};*/

exports.list = function(req, res){
    req.models.teacher.list(function(error, teachers) {
        if (error) return next(error);
        res.send(teachers);
    });
};
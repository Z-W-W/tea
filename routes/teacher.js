
/*
 * GET teacher listing.
 */

/*
var fs = require('fs');
var file = __dirname + '/teachers.json';
var context = fs.readFileSync(file, 'utf8');

exports.list = function(req, res){
    res.send(context);
};
*/

exports.list = function(req, res, next) {
    req.collections.Teachers.find({}).toArray(function(error, teachers) {
        if (error) return next(error);
        res.send({Teachers:teachers});
    });
};

/*
 * GET teacher listing.
 */

var fs = require('fs');
var file = __dirname + '/teacher_list.json';
var context = fs.readFileSync(file, 'utf8');

exports.list = function(req, res){
    res.send(context);
};
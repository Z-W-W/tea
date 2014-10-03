exports.teacher = require('./teacher');
exports.teacherschedule = require('./teacherschedule');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
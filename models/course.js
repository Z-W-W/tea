/**
 * Created by hawang on 10/1/14.
 */
var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Description: String
});

courseSchema.static({
    list: function(callback){
        this.find(
            {},
            null,
            {sort: {_id:-1}},
            callback
        );
    }
});

module.exports = mongoose.model('course', courseSchema);
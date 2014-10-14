/**
 * Created by hawang on 10/11/14.
 */
var mongoose = require('mongoose');

var statusSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Description: String,
    Code: Number
});

module.exports = mongoose.model('status', statusSchema);
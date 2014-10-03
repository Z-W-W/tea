var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Description: String,
    Email: {
        type: String,
        required: true,
        set: function(value) {return value.trim().toLowerCase()},
        validate: [
            function(email) {
                return (email.match(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i) != null)},
            'Invalid email'
        ],
        unique: true
    }
});

teacherSchema.static({
    list: function(callback){
        this.find(
            {},
            null,
            {sort: {_id:-1}},
            callback
        );
    }
});

module.exports = mongoose.model('teacher', teacherSchema);
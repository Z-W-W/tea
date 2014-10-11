var mongoose = require('mongoose');

var availabilitySchema =  new mongoose.Schema({
    StartTime : Date,
    EndTime : Date,
    Capacity : Number,
    Occupancy : Number
    });

var teacherScheduleSchema = new mongoose.Schema({
    TeacherID : String,
    CourseID : String,
    Availability : [availabilitySchema]
});

teacherScheduleSchema.statics.findByTeacherIDCourseID = function(teacherID, courseID, callback){
    this.find(
        {TeacherID: teacherID.trim(), ClassID: courseID.trim()},
        null,
        callback
    )
};

teacherScheduleSchema.static({
    list: function(callback){
        this.find(
            {},
            null,
            {sort: {_id:-1}},
            callback
        );
    }
});

module.exports = mongoose.model('teacherSchedule', teacherScheduleSchema);
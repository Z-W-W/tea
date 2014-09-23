#!/bin/sh
mongoimport --db chess --collection Teachers --file teachers.json --jsonArray
mongoimport --db chess --collection TeacherSchedules --file schedules.json --jsonArray
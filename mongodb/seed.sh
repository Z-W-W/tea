#!/bin/sh
mongoimport --db chess --collection teachers --file teachers.json --jsonArray
#!mongoimport --db chess --collection TeacherSchedules --file schedules.json --jsonArray
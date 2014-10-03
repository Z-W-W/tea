#!/bin/sh
#!mongoimport --db chess --collection teachers --file teachers.json --jsonArray
mongoimport --db chess --collection teacherschedules --file schedules.json --jsonArray
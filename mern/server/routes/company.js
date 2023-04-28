const express = require("express");
 
const companyRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

companyRoutes.route("/company").get((req,res) => {
  let db_connect = dbo.getDb("employees");
 db_connect
   .collection("company")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
})

companyRoutes.route("/company/create").post((req,res) => {
  let db_connect = dbo.getDb("employees");
  let myObj = {
    companyName: req.body.companyName
  }
  db_connect.collection("company").insertOne(myObj,function (err,response){
    if (err) throw err;
    res.json(response);
  })
})

module.exports = companyRoutes;
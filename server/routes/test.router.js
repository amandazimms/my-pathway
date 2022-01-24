const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/selected', (req, res) => {
  //@nickolas todo (from Amanda - thanks)
  //this should select * from the test table, 
  //  plus make a join with the questions table to get all the questions on this test.

  //this will be used when a proctor is viewing a test that's already been created
  
  //use variable req.params.test_id for the test id value
  
  //send back the results.rows
  
});

router.get('/all', (req, res) => {
  //@nickolas todo (from Amanda - thanks)
  //get * from the tests table
  //this will be used when a proctor is viewing all the tests that have been created
  //send back the results.rows
});


router.post('/', (req, res) => {
  //@nickolas todo (from Amanda - thanks)
  //post a new entry to the test table
  //this will happen when the proctor is creating a test

  //req.body is the test object. the columns are in:
  //req.body.title, req.body.points_possible, req.body.test_time_limit, 
  //req.body.question_shuffle, req.body.test_attempt_limit, and req.body.created_by

  //note that some columns are 'missing' from that list: 
  //for create_date you can use NOW() which will create a timestamp
  //for last_modified_by, re-use req.body.created_by 
  //for last_modified_date, also use NOW()

  //at the end of the query plz add the following 'RETURNING' stuff
  //which will let me utilize those dates created by NOW() and also the id:
  //  RETURNING id, create_date, last_modified_date;

  //finally plz send back results.rows[0] rather than results.rows

  //i did something similar to all that ^^ for solo so can help with any of that if needed!! 
  //same with Chris too, I believe
});

module.exports = router;

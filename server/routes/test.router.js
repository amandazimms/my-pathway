const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/selected', (req, res) => {
  //@nickolas todo
  //get * from one specific test
  //this will be used when a proctor is viewing a test that's already been created
  //use variable req.params.test_id for the test id value
  //send back the results.rows
  
});

router.get('/all', (req, res) => {
  //@nickolas todo
  //get * from the tests table
  //this will be used when a proctor is viewing all the tests that have been created
  //send back the results.rows
});


router.post('/', (req, res) => {

});

module.exports = router;

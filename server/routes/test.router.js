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
  console.log('req.query', req.query);
  const queryString = `SELECT * FROM test WHERE id=${req.query.test_id}` ;
  pool.query( queryString ).then( (results)=>{
    res.send( results.rows[0] );
  }).catch( (err)=>{
    console.log("error get test", err );
    res.sendStatus( 500 );
  })
});


router.get('/all', (req, res) => {
  //@nickolas todo (from Amanda - thanks)
  //get * from the tests table
  //this will be used when a proctor is viewing all the tests that have been created
  //send back the results.rows
  const queryString = `SELECT * FROM test`;
  pool.query( queryString ).then( (results)=>{
    res.send( results.rows );
  }).catch( (err)=>{
    console.log("error get test", err );
    res.sendStatus( 500 );
  })
});
router.post('/', (req, res) => {
  //@nickolas todo (from Amanda - thanks)
  //post a new entry to the test table, this will happen when the proctor is creating a test
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
  const id = req.params.id;                                                                                                                                                               
  const queryString = `INSERT INTO test (title, points_possible, test_time_limit, question_shuffle, 
      test_attempt_limit, created_by, last_modified_by) 
    
    VALUES ( $1, $2, $3, $4, $5, $6, $7 ) 
    RETURNING id, create_date, last_modified_date;`;

  const values = [ req.body.title, req.body.points_possible, req.body.test_time_limit, req.body.question_shuffle, 
      req.body.test_attempt_limit, req.body.created_by, req.body.last_modified_by ];
   pool.query( queryString, values).then( (results)=>{
    res.send(results.rows[0]);
  }).catch( (err)=>{
    console.log("error post test", err );
    res.send(err);
  })

});
router.put('/:id', (req, res)=> {
  //@nickolas todo (from Amanda - thanks)
  //this runs when a proctor edits any of the fields on the test settings, e.g. time limit.
  //even if they only update one thing, we will update on allll the columns,
  //even if it's to the same value as before (much simpler!)
  //the data you receive here will be very similar to the post, above
  //req.params.id is the id of the test
  //req.body is the test object, again containing almost all the same properties as in the post, above
  //the only difference is instead of created_by, we are sending last_modified_by
  //for last_modified_date use NOW()
  //and don't do anything with create_date or created_by
  //you don't need to do RETURNING
  //send a status 200 back
  const id = req.params.id
  const queryString = `UPDATE "test" SET title = $1, points_possible = $2, test_time_limit = $3, question_shuffle = $4, test_attempt_limit = $5, last_modified_by = $6, last_modified_date = CURRENT_TIMESTAMP WHERE id = $7`;
  const values = [ req.body.title, req.body.points_possible, req.body.test_time_limit, req.body.question_shuffle, req.body.test_attempt_limit, req.body.last_modified_by, id];
   pool.query( queryString, values ).then( (results)=>{
    res.sendStatus(200);
  }).catch( (err)=>{
    console.log("error put test", err );
    res.sendStatus( 500 );
  })
})
router.delete('/:id', (req,res)=> {
  //@nickolas todo (from Amanda - thanks)
  //delete the test with id req.params.id
  //send back status 200
  const id = req.params.id
  const queryString =  `DELETE FROM test WHERE id = $1`;
  pool.query(queryString, [id])
  .then(() => res.sendStatus(200))
  .catch( (err)=>{
    console.log("error delete test", err );
    res.sendStatus( 500 );
  })

});

module.exports = router;

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

  const queryString = `SELECT * FROM test INNER JOIN question ON test.id=question.parent_test_id` ;
  pool.query( queryString ).then( (results)=>{
    res.send( results.rows );
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
  const id = req.params.id
  const queryString = `INSERT INTO test (title, points_possible, test_time_limit, question_shuffle, test_attempt_limit, created_by) VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING *`;
  const values = [ req.body.title, req.body.points_possible, req.body.test_time_limit, req.body.question_shuffle, req.body.test_attempt_limit, req.body.created_by ];
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
  const queryString = `UPDATE "test" SET title = $1, points_possible = $2, test_time_limit = $3, question_shuffle = $4, test_attempt_limit = $5, created_by =$6, last_modified_date = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *`;
  const values = [ req.body.title, req.body.points_possible, req.body.test_time_limit, req.body.question_shuffle, req.body.test_attempt_limit, req.body.created_by, id];
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
  const queryString =  `DELETE FROM test WHERE id = $1 `;
  pool.query(queryString, [id])
  .then(() => res.sendStatus(200))
  .catch( (err)=>{
    console.log("error delete test", err );
    res.sendStatus( 500 );
  })

});


//QUESTIONS
router.get('/question/all', (req, res) => {
  //@nickolas todo (from Amanda - thanks)
  //get all questions for this specific test
  //this will be used when a proctor is viewing an already created test with questions already on it
  const id = req.params.test_id 
  const queryString = `SELECT * FROM question WHERE id = $1`
  pool.query( queryString, [id] ).then( (results)=>{
    res.send( results.rows );
  }).catch( (err)=>{
    console.log("error get all questions", err );
    res.sendStatus( 500 );
  })

  //req.params.test_id is the test id
  //send back the results.rows
});
router.post('/question', (req, res) => {
  //@nickolas todo (from Amanda - thanks)
  //post a new entry to the question table
  //this will happen when the proctor is creating a test and adding a question to it

  //req.body is the test object. the columns are in
  //req.body. ...
  // ... point_value, type, required, question, option_one, option_two ... option_six, answer, status
  // ... parent_test_id, created_by

  //like with the test post above:
  //for create_date and last_modified_date, you can use NOW() 
  //for last_modified_by, re-use req.body.created_by

  //at the end of the query plz add the following 'RETURNING' stuff
  //which will let me utilize those dates created by NOW() and also the id:
  //  RETURNING id, create_date, last_modified_date;

  //finally plz send back results.rows[0] rather than results.rows

  //i did something similar to all that ^^ for solo so can help with any of that if needed!!
  //same with Chris too, I believe

  const id = req.params.test_id 
  const queryString = `INSERT INTO question (point_value, type, required, question, option_one, option_two, option_three, option_four, option_five, option_six, answer, status) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 )  RETURNING *`;
  const values = [ req.body.point_value, req.body.type, req.body.required, req.body.question, req.body.option_one, req.body.option_two, req.body.option_three, req.body.option_four, req.body.option_five, req.body.option_six, req.body.answer, req.body.status];
   pool.query( queryString, values).then( (results)=>{
    res.send(results.rows[0]);
  }).catch( (err)=>{
    console.log("error post question", err );
    res.send(err);
  })

});
router.put('/question/:id', (req, res)=> {
  //@nickolas todo (from Amanda - thanks)
  //this is very analogous to the .put for test, higher above.

  //data received is the same as for .post /question, right above.

  //req.params.id is the id of the question

  //req.body is the question object, again containing almost all the same properties as in the post, right above this

  //the only difference is instead of created_by, we are sending last_modified_by
  //for last_modified_date use NOW()

  //and don't do anything with create_date or created_by
  //you don't need to do RETURNING
  //send a status 200 back
  const id = req.params.id
  const queryString = `UPDATE question SET point_value = $1, type = $2, required = $3, question = $4, option_one = $5, option_two = $6, option_three = $7, option_four = $8, option_five = $9, option_six = $10, answer = $11, status = $12, last_modified_date = CURRENT_TIMESTAMP WHERE id = $13`;
  const values = [ req.body.point_value, req.body.type, req.body.required, req.body.question, req.body.option_one, req.body.option_two, req.body.option_three, req.body.option_four, req.body.option_five, req.body.option_six, req.body.answer, req.body.status, id ];
   pool.query( queryString, values ).then( (results)=>{
    res.sendStatus(200);
  }).catch( (err)=>{
    console.log("error put test", err );
    res.sendStatus( 500 );
  })
  
})

router.delete('/question/:id', (req,res)=> {
  //@nickolas todo (from Amanda - thanks)
  //delete the question with id req.params.id
  //send back status 200
  const id = req.params.id
  const queryString =  `DELETE FROM question WHERE id = $1 `;
  pool.query(queryString, [id])
  .then(() => res.sendStatus(200))
  .catch( (err)=>{
    console.log("error delete question", err );
    res.sendStatus( 500 );
  })
});
module.exports = router;

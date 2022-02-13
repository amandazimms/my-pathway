const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/all', (req, res) => {
  //@nickolas todo (from Amanda - thanks)
  //get all questions for this specific test
  //this will be used when a proctor is viewing an already created test with questions already on it
  const id = req.query.parent_test_id 
  const queryString = `SELECT * FROM question WHERE parent_test_id = $1`
  pool.query( queryString, [id] ).then( (results)=>{
    console.log('Questions for Exam:', results.rows);
    res.send( results.rows );
  }).catch( (err)=>{
    console.log("error get all questions", err );
    res.sendStatus( 500 );
  })

  //req.params.test_id is the test id
  //send back the results.rows
});

router.post('/', (req, res) => {
  // console.log('req.body', req.body);
  const id = req.body.parent_test_id
  const queryString = `
  UPDATE test
  SET points_possible = $1,
  last_modified_by = $2,
  last_modified_date = CURRENT_TIMESTAMP
  WHERE id=${id};`
  const values = [req.body.test_value, req.body.user_id]
  pool.query(queryString, values).then((results) => {
    console.log('in QUESTION INSERT then function');
    const query = `INSERT INTO question 
      (point_value, type, required, question, option_one, option_two, option_three, option_four, option_five, option_six, answer, active, parent_test_id, created_by, last_modified_by)
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING id, point_value, type, required, question, option_one, option_two, option_three, option_four, option_five, option_six, answer, active, parent_test_id, created_by, last_modified_by;`;
    // RETURNING id, create_date, last_modified_date`;
    const values = [req.body.point_value, req.body.type, req.body.required, req.body.question, req.body.option_one, req.body.option_two, req.body.option_three, req.body.option_four, req.body.option_five, req.body.option_six, req.body.answer, req.body.active, req.body.parent_test_id, req.body.user_id, req.body.user_id];
    pool.query(query, values)
      .then((results) => {
        console.log('results', results.rows[0]);
        res.send(results.rows[0]);
      }).catch((err) => {
        console.log("error post question", err);
        res.send(err);
      })
  })
});


router.put('/:id', (req, res)=> {
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
  // console.log('req.body', req.body);
  const id = req.params.id
  const queryString = `UPDATE question 
  SET point_value = $1, 
  type = $2, r
  equired = $3, 
  uestion = $4, 
  ption_one = $5, o
  ption_two = $6, 
  option_three = $7, 
  option_four = $8, 
  option_five = $9, 
  option_six = $10, 
  answer = $11, 
  active = $12, 
  last_modified_by = $13,
  last_modified_date = CURRENT_TIMESTAMP 
  WHERE id = $14`;
  const values = [ req.body.point_value, req.body.type, req.body.required, req.body.question, req.body.option_one, req.body.option_two, req.body.option_three, req.body.option_four, req.body.option_five, req.body.option_six, req.body.answer, req.body.active, req.body.user_id, id ];
   pool.query( queryString, values ).then( (results)=>{
    //  console.log('req.body', req.body);
    const queryString = `
    UPDATE test
    SET points_possible = $1,
    last_modified_by = $2,
    last_modified_date = CURRENT_TIMESTAMP;`
    const values = [ req.body.test_value, req.body.user_id]
    pool.query( queryString, values )
  }).then((result) => {
    res.sendStatus(201)
  }).catch( (err)=>{
    console.log("error put question", err );
    res.sendStatus( 500 );
  })
  
})

router.delete('/:id', (req,res)=> {
  //@nickolas todo (from Amanda - thanks)
  //delete the question with id req.params.id
  //send back status 200
  // console.log('req.query', req.query);
  const id = req.params.id
  const queryString =  `DELETE FROM question WHERE id = $1`;
  pool.query(queryString, [id])
  .then(() => {
    // console.log('req.query', req.query);
    const id = req.query.parent_test_id
    const queryString = `
    UPDATE test
    SET points_possible = $1,
    last_modified_by = $2,
    last_modified_date = CURRENT_TIMESTAMP
    WHERE id=${id};`
    const values = [req.query.test_value, req.query.user_id]
    pool.query(queryString, values)
    .then(()=> res.sendStatus(201)) 
  })
  .catch( (err)=>{
    console.log("error delete question", err );
    res.sendStatus( 500 );
  })
});

module.exports = router;

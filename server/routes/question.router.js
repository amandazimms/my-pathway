const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/*
  This router handles CRUD for questions. 

  Since tests/questions are tightly linked, 
  it may make more sense to some to store some of these routes in the test router instead
*/
router.get('/all', (req, res) => {
  const id = req.query.parent_test_id 
  const queryString = `SELECT * FROM question WHERE parent_test_id = $1 ORDER BY id DESC;`
  pool.query( queryString, [id] ).then( (results)=>{
    // console.log('Questions for Exam:', results.rows);
    res.send( results.rows );
  }).catch( (err)=>{
    console.log("error get all questions", err );
    res.sendStatus( 500 );
  })
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
    // console.log('in QUESTION INSERT then function');
    const query = `INSERT INTO question 
      (point_value, type, required, question, option_one, option_two, option_three, option_four, option_five, option_six, answer, active, parent_test_id, created_by, last_modified_by)
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING id, point_value, type, required, question, option_one, option_two, option_three, option_four, option_five, option_six, answer, active, parent_test_id, created_by, last_modified_by;`;
    // RETURNING id, create_date, last_modified_date`;
    const values = [req.body.point_value, req.body.type, req.body.required, req.body.question, req.body.option_one, req.body.option_two, req.body.option_three, req.body.option_four, req.body.option_five, req.body.option_six, req.body.answer, req.body.active, req.body.parent_test_id, req.body.user_id, req.body.user_id];
    pool.query(query, values)
      .then((results) => {
        // console.log('results', results.rows[0]);
        res.send(results.rows[0]);
      }).catch((err) => {
        console.log("error post question", err);
        res.send(err);
      })
  })
});


router.put('/:id', (req, res)=> {
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

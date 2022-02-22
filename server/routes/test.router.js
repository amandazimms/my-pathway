const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/*
  This router handles CRUD for tests. 
*/
router.get('/selected', (req, res) => {
  // console.log('req.query', req.query);
  const queryString = `SELECT * FROM test WHERE id=${req.query.test_id}` ;
  pool.query( queryString ).then( (results)=>{
    res.send( results.rows[0] );
  }).catch( (err)=>{
    console.log("error get test", err );
    res.sendStatus( 500 );
  })
});


router.get('/all', (req, res) => {
  const queryString = `SELECT * FROM test ORDER BY title ASC`;
  pool.query( queryString ).then( (results)=>{
    res.send( results.rows );
  }).catch( (err)=>{
    console.log("error get test", err );
    res.sendStatus( 500 );
  })
});
router.post('/', (req, res) => {
  const id = req.params.id;                                                                                                                                                               
  const queryString = `INSERT INTO test (title, points_possible, test_time_limit, question_shuffle, 
      test_attempt_limit, created_by, last_modified_by, pass_threshold) 
    
    VALUES ( $1, $2, $3, $4, $5, $6, $7, $8) 
    RETURNING id, create_date, last_modified_date;`;

  const values = [ req.body.title, req.body.points_possible, req.body.test_time_limit, req.body.question_shuffle, 
      req.body.test_attempt_limit, req.body.created_by, req.body.last_modified_by, req.body.pass_threshold ];
   pool.query( queryString, values).then( (results)=>{
    res.send(results.rows[0]);
  }).catch( (err)=>{
    console.log("error post test", err );
    res.send(err);
  })

});
router.put('/:id', (req, res)=> {
  const id = req.params.id
  const queryString = `UPDATE "test" SET title = $1, points_possible = $2, test_time_limit = $3, 
          question_shuffle = $4, test_attempt_limit = $5, last_modified_by = $6, 
          last_modified_date = CURRENT_TIMESTAMP, pass_threshold = $7
          WHERE id = $8`;
  const values = [ req.body.title, req.body.points_possible, req.body.test_time_limit, req.body.question_shuffle, 
      req.body.test_attempt_limit, req.body.last_modified_by, req.body.pass_threshold, id];
   pool.query( queryString, values ).then( (results)=>{
    res.sendStatus(200);
  }).catch( (err)=>{
    console.log("error put test", err );
    res.sendStatus( 500 );
  })
})
router.delete('/:id', (req,res)=> {
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

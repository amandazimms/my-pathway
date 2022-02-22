const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/*
  This router handles CRUD for events. 
  
      Reminder - Definitions:
      A Test is a collection of questions
      An Event is a day/time where a specific test can be taken
      An Exam is an instance of one student assigned to that event; taking that test
  
  Since events/exams are tightly linked, 
  it may make more sense to some to store some of these routes in the exam router instead
*/
router.get('/selected', (req, res) => {
  const id = req.query.event_id
  const queryString = `SELECT event.id AS id, event.event_name, 
      test_id, proctor_id, url, event.event_date_start, event.event_date_end,
      test.title as test_title
    FROM event 
    JOIN test on event.test_id=test.id 
    WHERE event.id = $1`;
  pool.query( queryString, [id] ).then( (results)=>{
    res.send( results.rows[0]);
  }).catch( (err)=>{
    console.log("error get selected event", err );
    res.sendStatus( 500 );
  })
});
router.get('/all', (req, res) => {
  const queryString = `SELECT event.id AS id, event.event_name, 
    test_id, proctor_id, url, event.event_date_start, event.event_date_end,
    test.title as test_title 
  FROM event 
  JOIN test on event.test_id=test.id 
  ORDER BY event_date_end DESC`;
  pool.query( queryString ).then( (results)=>{
    res.send( results.rows );
  }).catch( (err)=>{
    console.log("error get events", err );
    res.sendStatus( 500 );
  })
});

router.get('/exams', (req, res) => {
  const queryString = 
  `SELECT
    exam.id AS exam_id, student_id, first_name, last_name, username, id_confirmed, present, 
    help, exam_time_start, exam_time_end, incident, exam.face_image, exam.id_image, "user".profile_picture 
  FROM exam
  JOIN "user" ON exam.student_id="user".id  
  WHERE event_id=${req.query.event_id} ORDER BY exam_id ASC`;
  pool.query( queryString ).then( (results)=>{
    res.send( results.rows );
  }).catch( (err)=>{
    console.log("error get exams", err );
    res.sendStatus( 500 );
  })
});

router.get('/examsHelp', (req, res) => {
  const queryString = 
    `SELECT help, id AS exam_id FROM exam WHERE event_id=${req.query.event_id} ORDER BY exam_id ASC`;
  pool.query( queryString ).then( (results)=>{
    res.send( results.rows );
  }).catch( (err)=>{
    console.log("error get exams help", err );
    res.sendStatus( 500 );
  })
});



router.post('/', (req, res) => {
  const queryString = `INSERT INTO event 
      (event_name, test_id, proctor_id, event_date_start, 
      event_date_end, url, created_by, last_modified_by ) 
     
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8)  
      RETURNING id, create_date, last_modified_date`;
  const values = [ req.body.event_name, req.body.test_id, req.body.proctor_id, 
      req.body.event_date_start, req.body.event_date_end, req.body.url, 
      req.body.created_by, req.body.created_by];
      
   pool.query( queryString, values).then( (results)=>{
    res.send(results.rows[0]);
  }).catch( (err)=>{
    console.log("error post event", err );
    res.send(err);
  })

});

router.put('/:id', (req, res)=> {
  const id = req.params.id
  const queryString = `UPDATE event SET event_name = $1, test_id = $2, proctor_id = $3, event_date_start = $4, event_date_end = $5, url = $6, last_modified_by = $7, last_modified_date=CURRENT_TIMESTAMP
  WHERE event.id = ${id}`;
  const values = [ req.body.event_name, req.body.test_id, req.body.proctor_id, req.body.event_date_start, req.body.event_date_end, req.body.url, req.body.last_modified_by ];
   pool.query( queryString, values ).then( (results)=>{
    res.sendStatus(200);
  }).catch( (err)=>{
    console.log("error put event", err );
    res.sendStatus( 500 );
  })

})
router.delete('/:id', (req,res)=> {
  const id = req.params.id
  const queryString =  `DELETE FROM event WHERE id = $1 `;
  pool.query(queryString, [id])
  .then(() => res.sendStatus(200))
  .catch( (err)=>{
    console.log("error delete event", err );
    res.sendStatus( 500 );
  })
});


module.exports = router;

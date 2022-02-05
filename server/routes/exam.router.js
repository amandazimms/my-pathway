const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/all', (req, res) => {
    const queryString = `SELECT * FROM exam`;
    pool.query( queryString ).then( (results)=>{
      res.send( results.rows );
    }).catch( (err)=>{
      console.log("error get exam", err );
      res.sendStatus( 500 );
    })
});
router.post('/', (req, res) => {

//.post notes
// req.body...
// ...event_id, student_id, and created_by (proctor id)
// also re-use the same value for created_by to update the "last_updated_by" column (both are the proctor who clicked just now)
//follow the same steps for test.router.post - need the same returning stuff and .rows[0]

  //@Nickolas I commented this queryString and Values as we are going to post just the few columns we have at the time of registering student. The remaining fields will be filled in in a PUT instead
  // const queryString = `INSERT INTO exam (event_id, student_id, incident, score, pass, exam_time_start, status, active_question_id, exam_time_end, created_by, create_date, last_modified_by, last_modified_date, face_image, id_image, id_confirmed, present, help, privacy_terms) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)  RETURNING id, create_date, last_modified_date`;
  // const values = [ req.body.event_id, req.body.student_id, req.body.incident, req.body.score, req.body.pass, req.body.exam_time_start, req.body.status, req.body.active_question_id, req.body.exam_time_end, req.body.created_by, req.body.create_date, req.body.last_modified_by, req.body.last_modified_date, req.body.face_image, req.body.id_image, req.body.id_confirmed, req.body.present, req.body.help, req.body.privacy_terms ];
  
  //req.body.student_id
  //req.body.proctor_id
  //req.body.event_id
  const queryString = `INSERT INTO exam (event_id, student_id, created_by, last_modified_by) 
                        VALUES ($1, $2, $3, $4)`;
  const values = [req.body.event_id, req.body.student_id, req.body.proctor_id, req.body.proctor_id];
  pool.query( queryString, values).then( (results)=>{
    res.sendStatus(200);
  }).catch( (err)=>{
    console.log("error post exam", err );
    res.send(err);
  })
});

router.put('/:id', (req, res)=> {
    const id = req.params.id
    const queryString = `UPDATE exam SET event_id = $1, student_id = $2, incident = $3, score = $4, pass = $5, exam_time_start = $6, status = $7, active_question_id = $8, exam_time_end = $9, created_by = $10, create_date = $11, last_modified_by = $12, last_modified_date = $13, face_image = $14, id_image = $15, id_confirmed = $16, present = $17, help = $18, privacy_terms = $19
    WHERE exam.id = ${id}`;
    const values = [ req.body.event_id, req.body.student_id, req.body.incident, req.body.score, req.body.pass, req.body.exam_time_start, req.body.status, req.body.active_question_id, req.body.exam_time_end, req.body.created_by, req.body.create_date, req.body.last_modified_by, req.body.last_modified_date, req.body.face_image, req.body.id_image, req.body.id_confirmed, req.body.present, req.body.help, req.body.privacy_terms ];
     pool.query( queryString, values ).then( (results)=>{
      res.sendStatus(200);
    }).catch( (err)=>{
      console.log("error put exam", err );
      res.sendStatus( 500 );
    })
});

router.delete('/:id', (req,res)=> {
    const id = req.params.id
    const queryString =  `DELETE FROM exam WHERE id = $1`;
    pool.query(queryString, [id])
    .then(() => res.sendStatus(200))
    .catch( (err)=>{
      console.log("error delete exam", err );
      res.sendStatus( 500 );
    })
});


module.exports = router;

//return id of newly created exam
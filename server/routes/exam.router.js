const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/search', (req,res) => {
  //req.query.search_text
  //req.query.event_id 

  const queryString = `SELECT CASE WHEN y.in_event=1 
                THEN true ELSE false END AS 
                  registered, y.total_registered, y.in_event,y.username, 
                  y.first_name, y.last_name, y.user_id, y.profile_picture
                FROM
                  (SELECT COUNT (event_id) AS total_registered, 
                      SUM (CASE WHEN event_id=${req.query.event_id} THEN 1 ELSE 0 END) 
                        AS in_event, username, first_name, last_name, 
                        "user".id AS user_id, profile_picture
                  FROM "user" 
                  LEFT JOIN "exam" ON exam.student_id="user".id
                  WHERE ("username" ILIKE '%${req.query.search_text}%' 
                          OR first_name ILIKE '%${req.query.search_text}%' 
                          OR last_name ILIKE '%${req.query.search_text}%')
                  AND "user".role='STUDENT'
                  GROUP BY user_id, username, first_name, last_name, profile_picture) 
                AS y;`

  pool.query(queryString).then((results)=>{
    res.send(results.rows);

  }).catch((err)=>{
    console.log('error with search students GET:', err);
    res.sendStatus(500);
  })
});

router.get('/all', (req, res) => {
  const id = req.query.exam.student_id
    const queryString = `SELECT points_possible, username, first_name, last_name, profile_picture, 
    incident, pass, score, test.title AS test_title, "event".event_date_start AS event_date, 
    exam.status AS exam_status, exam.id AS exam_id, active_question_id
  FROM exam 
  JOIN "event" ON "event".id=exam.event_id
  JOIN test ON test.id="event".test_id
  JOIN "user" ON exam.student_id="user".id
  WHERE exam.student_id = $1`;
    pool.query( queryString, [id] ).then( (results)=>{
      res.send( results.rows );
    }).catch( (err)=>{
      console.log("error get exam", err );
      res.sendStatus( 500 );
    })
});

router.get('/question', (req, res) => {
  const id = req.query.exam_id
  const queryString = `SELECT question.question AS question, point_value, answer,
      option_one, option_two, option_three, option_four, option_five, option_six
  FROM exam    
  JOIN "question" ON question.id=exam.active_question_id
  WHERE exam.id = $1`; 
    pool.query( queryString, [id] ).then( (results)=>{
      res.send( results.rows[0] );
    }).catch( (err)=>{
      console.log("error get exam question", err );
      res.sendStatus( 500 );
    })
});


router.get('/selected', (req, res) => {
  const id = req.query.exam_id
  const queryString = `SELECT points_possible, username, first_name, last_name, profile_picture, 
	    incident, pass, score, test.title AS test_title, "event".event_date_start AS event_date, 
      exam.status AS exam_status, exam.id AS exam_id, active_question_id
    FROM exam 
    JOIN "event" ON "event".id=exam.event_id
    JOIN test ON test.id="event".test_id
    JOIN "user" ON exam.student_id="user".id
    WHERE exam.id = $1`;
  pool.query( queryString, [id] ).then( (results)=>{
    res.send( results.rows[0] );
  }).catch( (err)=>{
    console.log("error get selected exam", err );
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

router.post('/detail', (req, res) => {
    const queryString = `INSERT INTO exam_detail (exam_id, question_id) 
                          VALUES ($1, $2)
                          RETURNING *`;
    const values = [req.body.exam_id, req.body.question_id];
    pool.query( queryString, values).then( (results)=>{
      res.send(results.rows[0]);
    }).catch( (err)=>{
      console.log("error post exam", err );
      res.send(err);
    })
  });

router.put('/photo', (req, res)=> {
  console.log('query', req.query);
  console.log('body', req.body);
  console.log('params', req.params);
  const queryString = `UPDATE exam SET face_image = $1, last_modified_by = $2, last_modified_date =CURRENT_TIMESTAMP
  WHERE exam.id = ${req.body.exam_id}
  RETURNING *`;
  const values = [ req.body.url, req.body.user_id ];
   pool.query( queryString, values ).then( (results)=>{
    res.send(results.rows[0]);
  }).catch( (err)=>{
    console.log("error put exam photo", err );
    res.sendStatus( 500 );
  })
});

router.put('/id-image', (req, res)=> {
  console.log('body', req.body);
  const queryString = `UPDATE exam SET id_image = $1, last_modified_by = $2, last_modified_date =CURRENT_TIMESTAMP
  WHERE exam.id = ${req.body.exam_id}
  RETURNING *`;
  const values = [ req.body.url, req.body.user_id ];
   pool.query( queryString, values ).then( (results)=>{
    res.send(results.rows[0]);
  }).catch( (err)=>{
    console.log("error put exam photo", err );
    res.sendStatus( 500 );
  })
});

router.put('/confirm-id', (req, res)=> {
  console.log('body', req.body);
  const queryString = `UPDATE exam SET id_confirmed = $1, last_modified_by = $2, last_modified_date =CURRENT_TIMESTAMP
  WHERE exam.id = ${req.body.exam_id}
  RETURNING *`;
  const values = [ req.body.id_confirmed, req.body.user_id ];
   pool.query( queryString, values ).then( (results)=>{
    res.send(results.rows[0]);
  }).catch( (err)=>{
    console.log("error put exam photo", err );
    res.sendStatus( 500 );
  })
});

router.put('/passFail/:id', (req, res)=> {
  //req.body.status is PASS or FAIL
  //req.params.id is the id
  const queryString = `UPDATE exam SET pass = $1
    WHERE exam.id = ${req.params.id}`;
  const values = [req.body.pass]  
  pool.query( queryString, values ).then( (results)=>{
    res.sendStatus(200);
  }).catch( (err)=>{
    console.log("error put exam pass", err );
    res.sendStatus( 500 );
  })
});

router.put('/begin-exam/:id', (req, res)=> {
  const queryString = `UPDATE exam SET exam_time_start = CURRENT_TIMESTAMP
    WHERE exam.id = ${req.params.id}`;
  pool.query( queryString ).then( (results)=>{
    const queryString = `SELECT points_possible, username, first_name, last_name, profile_picture, 
    incident, pass, score, test.title AS test_title, "event".event_date_start AS event_date, 
    exam.status AS exam_status, exam.id AS exam_id, active_question_id
    FROM exam 
    JOIN "event" ON "event".id=exam.event_id
    JOIN test ON test.id="event".test_id
    JOIN "user" ON exam.student_id="user".id
    WHERE exam.id = ${req.params.id}`;
    pool.query( queryString ).then( (results)=>{
      res.send(results.rows[0])
  }).catch( (err)=>{
    console.log("error put exam pass", err );
    res.sendStatus( 500 );
  })
})
});

router.put('/active-question', (req, res)=> {
  const queryString = `UPDATE exam SET active_question_id = $1, last_modified_date=CURRENT_TIMESTAMP, last_modified_by=$2
    WHERE exam.id = ${req.body.exam_id}`;
  const values = [req.body.question_id, req.body.user_id] 
  pool.query( queryString, values ).then( (results)=>{
    const queryString = `SELECT points_possible, username, first_name, last_name, profile_picture, 
    incident, pass, score, test.title AS test_title, "event".event_date_start AS event_date, 
    exam.status AS exam_status, exam.id AS exam_id, active_question_id
    FROM exam 
    JOIN "event" ON "event".id=exam.event_id
    JOIN test ON test.id="event".test_id
    JOIN "user" ON exam.student_id="user".id
    WHERE exam.id = ${req.body.exam_id}`;
    pool.query( queryString ).then( (results)=>{
      res.send(results.rows[0])
  }).catch( (err)=>{
    console.log("error put exam pass", err );
    res.sendStatus( 500 );
  })
})
});



router.put('/status/:id', (req, res)=> {
  //req.body.status is REJECTED or APPROVED
  //req.params.id is the id
  const queryString = `UPDATE exam SET status = $1
    WHERE exam.id = ${req.params.id}`;
  const values = [req.body.status]  
  pool.query( queryString, values ).then( (results)=>{
    res.sendStatus(200);
  }).catch( (err)=>{
    console.log("error put exam status", err );
    res.sendStatus( 500 );
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
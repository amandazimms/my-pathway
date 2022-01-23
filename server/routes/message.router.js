const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * POST route template
 */
router.post('/', (req, res) => {
  console.log('MADE IT TO MESSAGE PUT', req.body);
  const query = `INSERT INTO "message_session" ("exam_id", "created_by")
                   VALUES ($1, $2)
                   RETURNING "id";`;
  pool.query(query, [req.body.examId, req.body.userId])
    .then(result => {
      console.log(result.rows[0].id);
      const newMessageSessionId = result.rows[0].id;
      const query = `SELECT 
                    message_session.id AS message_session_id,
                    exam.id AS exam_id,
                    event.id AS event_id,
                    event.name AS event_name,
                    event.proctor_id AS proctor_id,
                    proctor.first_name AS proctor_first_name,
                    proctor.last_name AS proctor_last_name,
                    exam.student_id AS student_id,
                    student.first_name AS student_first_name,
                    student.last_name AS student_last_name
                    FROM message_session
                    JOIN exam ON exam.id=message_session.exam_id
                    JOIN event ON exam.event_id=event.id
                    LEFT JOIN "user" AS proctor ON proctor.id=event.proctor_id
                    LEFT JOIN "user" AS student ON student.id=exam.student_id
                    WHERE message_session.id=${newMessageSessionId}`
      pool.query(query).then(result => {
        console.log('Message_Session Query Results', result.rows);
        res.send(result.rows);
      })
        .catch(err => {
          console.log('ERROR: Get all quizes', err);
          res.sendStatus(500)
        })
    })
});

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // POST route code here
});

module.exports = router;

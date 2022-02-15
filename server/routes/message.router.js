const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * POST route template
 */
router.post('/session', (req, res) => {
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
                    event.event_name AS event_name,
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
        res.send(result.rows[0]);
      })
        .catch(err => {
          console.log('ERROR: Get Message Session', err);
          res.sendStatus(500)
        })
    })
});

router.post('/detail', (req, res) => {
  console.log('MADE IT TO MESSAGE DETAIL PUT', req.body);
  const query = `INSERT INTO "message_detail" ("message_session_id", "creator_id", "message")
                   VALUES ($1, $2, $3)
                   RETURNING "id";`;
  pool.query(query, [req.body.message_session_id, req.body.creator_id, req.body.message])
    .then(result => {
      console.log(result.rows[0].id);
      const newMessageDetailId = result.rows[0].id;
      const query = `SELECT
                    message_detail.id AS message_id,
                    message_detail.message_session_id AS message_session_id,
                    message_detail.create_date AS timestamp,
                    message_detail.creator_id AS creator_id,
                    message_detail.message AS message,
                    "user".first_name AS creator_first_name,
                    "user".last_name AS creator_last_name
                    FROM message_detail
                    JOIN "user" ON message_detail.creator_id="user".id
                    WHERE message_detail.message_session_id=${req.body.message_session_id}
                    ORDER BY timestamp ASC;`
      pool.query(query).then(result => {
        console.log('Message_Session Query Results', result.rows);
        res.send(result.rows);
      })
        .catch(err => {
          console.log('ERROR: Get all messages detail', err);
          res.sendStatus(500)
        })
    })
});

/**
 * GET route template
 */
router.get('/sessions', (req, res) => {
  console.log('In GET available sessions', req.query);
  const query = `SELECT 
                  message_session.id AS message_session_id,
                  exam.id AS exam_id,
                  event.id AS event_id,
                  event.event_name AS event_name,
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
                  WHERE (exam_id=${req.query.exam_id} AND proctor_id=${req.query.user_id})
                  OR (exam_id=${req.query.exam_id} AND student_id=${req.query.user_id});`
  pool.query(query)
  .then( result => {
  res.send(result.rows);
  })
  .catch(err => {
  console.log('ERROR: Get Available Message Sessions', err);
  res.sendStatus(500)
  })
});

router.get('/detail', (req, res) => {
  console.log('In GET MESSAGE DETAIL', req.query);
  const query = `SELECT
                message_detail.id AS message_id,
                message_detail.message_session_id AS message_session_id,
                message_detail.create_date AS timestamp,
                message_detail.creator_id AS creator_id,
                message_detail.message AS message,
                "user".first_name AS creator_first_name,
                "user".last_name AS creator_last_name
                FROM message_detail
                JOIN "user" ON message_detail.creator_id="user".id
                WHERE message_detail.message_session_id=${req.query.session_id}
                ORDER BY timestamp ASC;`
  pool.query(query)
  .then( result => {
  res.send(result.rows);
  })
  .catch(err => {
  console.log('ERROR: Get Available Message Sessions', err);
  res.sendStatus(500)
  })
});

router.get('/fetch-active', (req, res) => {
  console.log('In GET available sessions', req.query);
  const query = `SELECT 
                  message_session.id AS message_session_id,
                  exam.id AS exam_id,
                  event.id AS event_id,
                  event.event_name AS event_name,
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
                  WHERE message_session.exam_id=${req.query.exam_id};`
  pool.query(query)
  .then( result => {
  res.send(result.rows[0]);
  })
  .catch(err => {
  console.log('ERROR: Get Message Session Info', err);
  res.sendStatus(500)
  })
});

module.exports = router;

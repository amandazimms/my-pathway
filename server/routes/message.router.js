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
      const query = `SELECT * FROM message_session
                     JOIN exam ON exam.id=message_session.exam_id
                     JOIN event ON exam.event_id=event.id
                     JOIN "user" ON event.proctor_id="user".id
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

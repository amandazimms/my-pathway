const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('MADE IT TO CHAT PUT', req.body);
    const query = `INSERT INTO "message_session" ("exam_id", "created_by")
                   VALUES ($1, $2)
                   RETURNING "id";`;
  pool.query(query, [req.body.examId, req.body.userId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all quizes', err);
      res.sendStatus(500)
    })
});

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // POST route code here
});

module.exports = router;

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


/*
  This router is responsible for CRUD for "other" users, not the user that is logged in: 
  e.g. get all the users; get all the proctors; or make another user into a proctor
 */
router.get('/', (req, res) => {
  // console.log('In GET allUsers');
  const query = `SELECT 
                  "user".first_name AS first_name,
                  "user".last_name AS last_name,
                  "user".username AS email,
                  "user".role AS role,
                  "user".id AS id, 
                  "user".profile_picture AS profile_picture  
                  FROM "user"
                  ORDER BY last_name;`
  pool.query(query)
  .then( result => {
  res.send(result.rows);
  })
  .catch(err => {
  console.log('ERROR: GET allUsers', err);
  res.sendStatus(500)
  })
});

router.get('/proctors', (req, res) => {
  const query = `SELECT 
                  "user".first_name AS first_name,
                  "user".last_name AS last_name,
                  "user".username AS email,
                  "user".role AS role,
                  "user".id AS id
                  FROM "user"
                  WHERE "user".role='PROCTOR'
                  ORDER BY last_name;`
  pool.query(query)
  .then( result => {
  res.send(result.rows);
  })
  .catch(err => {
  console.log('ERROR: GET allUsers', err);
  res.sendStatus(500)
  })
});



router.put('/role', (req, res) => {
  // console.log('In PUT Role Update', req.body);
  const query = 
    `UPDATE "user"
    SET "role"= 'PROCTOR'
    WHERE "user".id=${req.body.update_id};`
  pool.query(query)
    .then(() => {
      const query = `SELECT 
                  "user".first_name AS first_name,
                  "user".last_name AS last_name,
                  "user".username AS email,
                  "user".role AS role,
                  "user".id AS id
                  FROM "user"
                  ORDER BY id DESC;`
      pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: PUT Role Update', err);
      res.sendStatus(500)
    })
  })
});


module.exports = router;

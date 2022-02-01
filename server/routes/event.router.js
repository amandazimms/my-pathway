const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/selected', (req, res) => {
  //@nickolas todo (from Amanda - thanks)
  //select * from event from the db WHERE id is req.params.event_id
  const id = req.params.event_id
  const queryString = `SELECT * FROM event WHERE id = $1` ;
  pool.query( queryString, [id] ).then( (results)=>{
    res.send( results.rows );
  }).catch( (err)=>{
    console.log("error get event", err );
    res.sendStatus( 500 );
  })
});
router.get('/all', (req, res) => {
  //@nickolas todo (from Amanda - thanks)
  //select * from events
  const queryString = `SELECT * FROM event` ;
  pool.query( queryString ).then( (results)=>{
    res.send( results.rows );
  }).catch( (err)=>{
    console.log("error get events", err );
    res.sendStatus( 500 );
  })
});
router.post('/', (req, res) => {
  //@nickolas todo (from Amanda - thanks)
  //post a new event to db.

  //req.body is the event object
  //use these for columns. req.body. ...
  //... event_name, test_id, proctor_id, event_date, event_time, event_end_time, url, last_modified_by

  //leave create_date and last_modified_date empty so that it adds current timestamp like with test router
  
  //at the end of the query plz add the following 'RETURNING' stuff
  //which will let me utilize those dates created, and also the id:
  //  RETURNING id, create_date, last_modified_date;
  //finally plz send back results.rows[0] rather than results.rows

  console.log('req.params:', req.params);
  console.log('req.body:', req.body);

  const queryString = `INSERT INTO event (event_name, test_id, proctor_id, event_date, event_time, event_end_time, url, last_modified_by ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 )  RETURNING id, create_date, last_modified_date`;
  const values = [ req.body.event_name, req.body.test_id, req.body.proctor_id, req.body.event_date, req.body.event_time, req.body.event_end_time, req.body.url, req.body.last_modified_by];
   pool.query( queryString, values).then( (results)=>{
    res.send(results.rows[0]);
  }).catch( (err)=>{
    console.log("error post event", err );
    res.send(err);
  })

});
router.put('/:id', (req, res)=> {
  //@nickolas todo (from Amanda - thanks)
  //update an event entry in the db

  //req.params.id is the id of the event to update

  //same columns need to be updated as were added in the .post above
  //for last_modified_by, do it the same as test.router's .put
  //(no RETURNING)
  //send 200 back :)

  const id = req.params.id
  const queryString = `UPDATE event SET event_name = $1, test_id = $2, proctor_id = $3, event_date = $4, event_time = $5, event_end_time = $6, url = $7, last_modified_by = $8`;
  const values = [ req.body.event_name, req.body.test_id, req.body.proctor_id, req.body.event_date, req.body.event_time, req.body.event_end_time, req.body.url, req.body.last_modified_by ];
   pool.query( queryString, values ).then( (results)=>{
    res.sendStatus(200);
  }).catch( (err)=>{
    console.log("error put event", err );
    res.sendStatus( 500 );
  })

})
router.delete('/:id', (req,res)=> {
  //@nickolas todo (from Amanda - thanks)
  //delete an event entry from the db
  //req.params.id is the id of the event to delete
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

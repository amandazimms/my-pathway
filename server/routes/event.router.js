const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/selected', (req, res) => {
  //@nickolas todo (from Amanda - thanks)
  //select * from event from the db WHERE id is req.params.event_id
});
router.get('/all', (req, res) => {
  //@nickolas todo (from Amanda - thanks)
  //select * from events
 
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
});
router.put('/:id', (req, res)=> {
  //@nickolas todo (from Amanda - thanks)
  //update an event entry in the db

  //req.params.id is the id of the event to update

  //same columns need to be updated as were added in the .post above
  //for last_modified_by, do it the same as test.router's .put
  //(no RETURNING)
  //send 200 back :)
})
router.delete('/:id', (req,res)=> {
  //@nickolas todo (from Amanda - thanks)
  //delete an event entry from the db
  //req.params.id is the id of the event to delete
});


module.exports = router;

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



router.get('/', (req, res) => {
//get all exams where student id is {req.params.student_id}
// (select *)

});

//.post notes
// req.body...
// ...event_id, student_id, and created_by (proctor id)
// also re-use the same value for created_by to update the "last_updated_by" column (both are the proctor who clicked just now)
//follow the same steps for test.router.post - need the same returning stuff and .rows[0]
router.post('/', (req, res) => {
  
});
router.put('/:id', (req, res)=> {
 
});
router.delete('/:id', (req,res)=> {
 
});


module.exports = router;

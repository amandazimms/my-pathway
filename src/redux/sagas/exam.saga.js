import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/*
  This picks up component dispatches for exams. 
  
      Reminder - Definitions:
      A Test is a collection of questions
      An Event is a day/time where a specific test can be taken
      An Exam is an instance of one student assigned to that event; taking that test
  
  Since events/exams are tightly linked, 
  it may make more sense to some to store some of these in the event saga instead
*/

function* eventSaga() {
  yield takeLatest('SET_EXAM_PHOTO', setExamPhoto);//inputs the student photo url into exam table
  yield takeLatest('SET_ID_PHOTO', setIdPhoto);//inputs the id card image url into exam table. 
  yield takeLatest('CONFIRM_STUDENT_ID', confirmId);//updates the value of confirm_id in exam table. 
  yield takeLatest('BEGIN_EXAM', beginExam);//updates the value of confirm_id in exam table.
  yield takeLatest('END_EXAM', endExam);//updates the value of confirm_id in exam table.
  yield takeLatest('FETCH_MY_EXAMS', fetchMyExams);//fetches all the info for a single Exam. 
  yield takeLatest('FETCH_SELECTED_EXAM', fetchSelectedExam);//fetches all the info for a single Exam. 
  yield takeLatest('CREATE_EXAM_DETAIL_RECORD', createExamDetailRecord);//created new exam detail record shell. 
  yield takeLatest('UPDATE_ACTIVE_EXAM_QUESTION', updateActiveExamQuestion);//update exam with students active question id.
  yield takeLatest('CAPTURE_ANSWER', captureAnswer);//updates exam_detail record with answer and graded outcome.
  yield takeLatest('SCORE_EXAM', scoreExam);
  yield takeLatest('ACCEPT_TERMS', acceptTerms);  
  yield takeLatest('APPROVE_EXAM', approveExam);
  yield takeLatest('REJECT_EXAM', rejectExam);
  yield takeLatest('UPDATE_EXAM_AWAITING_APPROVAL', updateExamAwaitingApproval);
  yield takeLatest('PASS_EXAM', passExam);
  yield takeLatest('FAIL_EXAM', failExam); 
  yield takeLatest('FETCH_EXAM_QUESTION_PROCTOR', fetchExamQuestionProctor);  
  yield takeLatest('ADD_INCIDENT', addIncident);
  yield takeLatest('CHANGE_HELP_STATUS', changeHelpStatus);
}


// worker Saga: will be fired on "CHANGE_HELP_STATUS" actions
function* changeHelpStatus(action) {
  //for when a student raises/lowers their hand - the 'help' column of DB is changed to t/f
  const ap = action.payload;
  //ap.help is true or false
  //ap.exam_id is the exam id
  try {
    yield axios.put(`/api/exam/changeHelp/${ap.exam_id}`, {help: ap.help});
    yield put({ type: 'SET-UPDATE_SELECTED_EXAM', payload: {help: ap.help } });
  } catch (error) {
    console.log('update exam change-help failed', error);
  }
}

// worker Saga: will be fired on "ADD_INCIDENT" actions
function* addIncident(action) {
  const ap = action.payload;
  //ap.exam_detail_id
  //ap.exam_id
  try {
    const response = yield axios.put(`/api/exam/addIncident/${ap.exam_detail_id}`, {exam_id: ap.exam_id} );

    yield put({ type: 'SET-UPDATE_SELECTED_EXAM', payload: { incident: response.data.incident } });
  } catch (error) {
    console.log('update increment incident failed', error);
  }
}

function* createExamDetailRecord(action) {
  //runs when a student is taking an exam, each time they click to move on to the next question
  //an exam detail record holds the data about one question on one exam for one student
  const ap = action.payload;
  //ap.event is the event object to update, 
  //including event_name, test_id, proctor_id, event_date, event_time
  //event_end_time, url, last_modified_by, and id
  try {
    const response = yield axios({
      method: 'POST',
      url: `/api/exam/detail`,
      data: ap
    });
    yield put({ type: 'SET_SELECTED_EXAM_DETAIL', payload: response.data });
  } catch (error) {
    console.log('setExamDetail failed', error);
  }
}


function* updateActiveExamQuestion(action) {
  const ap = action.payload;
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/exam/active-question`,
      data: ap
    });
    yield put({ type: 'SET_SELECTED_EXAM', payload: response.data });
  } catch (error) {
    console.log('update active exam question failed', error);
  }
}

function* acceptTerms(action) {
  //terms of use
  const ap = action.payload;
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/exam/accept-terms`,
      data: ap
    });
    yield put({ type: 'SET_SELECTED_EXAM', payload: response.data });
    ap.done()
  } catch (error) {
    console.log('accept terms failed', error);
  }
}

function* captureAnswer(action) {
  const ap = action.payload;
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/exam/answer`,
      data: ap
    });
  } catch (error) {
    console.log('capture answer failed', error);
  }
}

 // worker Saga: will be fired on "FETCH_EXAM_QUESTION_PROCTOR" actions
function* fetchExamQuestionProctor(action){
  //when proctor enters an exam to assist a student, this is how they see the question the student is seeing
  const ap = action.payload;
  //ap.exam_id
  try {
    const response = yield axios.get('/api/exam/question', { params: {exam_id: ap.exam_id} });
    yield put({ type: 'SET_SELECTED_EXAM_QUESTION_PROCTOR', payload: response.data });
  } catch (error) {
    console.log('fetch exam question failed', error);
  }
}

 // worker Saga: will be fired on "FETCH_SELECTED_EXAM" actions
 function* fetchSelectedExam(action) {
  const ap = action.payload;
  //ap.exam_id is the exam id to fetch
  try {
    const response = yield axios.get('/api/exam/selected', {params: {exam_id: ap.exam_id} });
    yield put({ type: 'SET_SELECTED_EXAM', payload: response.data });
  } catch (error) {
    console.log('get selected exam request failed', error);
  }
}

 // worker Saga: will be fired on "FETCH_MY_EXAMS" actions
 function* fetchMyExams(action) {
   //for student - list of all exams/events they are registered to
  const ap = action.payload;
  try {
    const response = yield axios.get('/api/exam/my-exams', { params: {student_id: ap.student_id} });

    const myExams = response.data;   
    const now = new Date().valueOf();


    for (const myExams of myExams){
      myExams.exam_status = ''
      if (now >= new Date(myExams.event_date_end).valueOf()){
        myExams.exam_status = 'COMPLETE'
      }
      else if (now < new Date(myExams.event_date_start).valueOf()){
        myExams.exam_status = 'UPCOMING'
      }
      else if (now > new Date(myExams.event_date_start).valueOf() && now < new Date(myExams.event_date_end).valueOf()){
        myExams.exam_status = 'IN PROGRESS'
      }
    }

    yield put({ type: 'SET_MY_EXAMS', payload: myExams });
  } catch (error) {
    console.log('get my exams request failed', error);
  }
}

function* beginExam(action) {
  const ap = action.payload;
  try {
    const exam = yield axios.put(`/api/exam/begin-exam/${ap.exam_id}`);
    yield put({ type: 'SET_SELECTED_EXAM', payload: exam.data });
  } catch (error) {
    console.log('update pass exam failed', error);
  }
}

function* endExam(action) {
  const ap = action.payload;
  try {
    const exam = yield axios.put(`/api/exam/end-exam/${ap.exam_id}`);

    //score the exam after it is submitted:
    const score = yield () => {
      let scoreSum = 0

      for(let i=0; i<exam.data.length; i++){
        if(exam.data[i].correct === true){
          scoreSum += exam.data[i].point_value
        }
      }
      return scoreSum
    }

    let totalScore = score();

    //compare to the pass/fail threshold set for this test
    const passFail = yield () => {
      if (exam.data.length > 0){
        const pointsPossible = exam.data[0].test_points_possible;
        const threshold = exam.data[0].test_pass_threshold
        return totalScore/pointsPossible >= threshold ? "PASS" : "FAIL"; 
      }
    }

    yield put({ 
      type: 'SCORE_EXAM', 
      payload: {
        exam_id:ap.exam_id,
        score: totalScore,
        pass: passFail()
    }});
    
    yield put({ type: 'UNSET_SELECTED_EXAM'});
    yield put({ type: 'UNSET_SELECTED_EXAM_DETAIL'});
    yield ap.done()
  } catch (error) {
    console.log('update end exam put failed', error);
  }
}

function* scoreExam(action) {
  //records the score, tallied in endExam, to the DB
  const ap = action.payload;
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/exam/score-exam`,
      data: ap
    });
  } catch (error) {
    console.log('scoreExam failed', error);
  }
}

// worker Saga: will be fired on "PASS_EXAM" actions
function* passExam(action) {
  //not using at the moment - 
  //this is from an older concept where proctor manually clicked "pass" 
  //because we didn't know the % threshold to pass!
  const ap = action.payload;
  //ap.exam_id
  try {
    yield axios.put(`/api/exam/passFail/${ap.exam_id}`, { pass: "PASS" });
    yield put({ type: 'SET-UPDATE_SELECTED_EXAM', payload: { pass: "PASS" } });
  } catch (error) {
    console.log('update pass exam failed', error);
  }
}

// worker Saga: will be fired on "FAIL_EXAM" actions
function* failExam(action) {
  //not using at the moment - 
  //this is from an older concept where proctor manually clicked "fail" 
  //because we didn't know the % threshold to pass!
  const ap = action.payload;
  //ap.exam_id
  try {
    yield axios.put(`/api/exam/passFail/${ap.exam_id}`, { pass: "FAIL" });
    yield put({ type: 'SET-UPDATE_SELECTED_EXAM', payload: { pass: "FAIL" } });
  } catch (error) {
    console.log('update fail exam failed', error);
  }
}


// worker Saga: will be fired on "APPROVE_EXAM" actions
function* approveExam(action) {
  //proctor manual approval of a student's exam after exam is taken
  const ap = action.payload;
  //ap.exam_id
  try {
    yield axios.put(`/api/exam/status/${ap.exam_id}`, { status: "APPROVED" });
    yield put({ type: 'SET-UPDATE_SELECTED_EXAM', payload: { exam_status: "APPROVED" } });
  } catch (error) {
    console.log('update exam failed', error);
  }
}

// worker Saga: will be fired on "REJECT_EXAM" actions
function* rejectExam(action) {
  //proctor manual rejection of a student's exam after exam is taken
  const ap = action.payload;
  //ap.exam_id
  try {
    yield axios.put(`/api/exam/status/${ap.exam_id}`, { status: "REJECTED" });
    yield put({ type: 'SET-UPDATE_SELECTED_EXAM', payload: { exam_status: "REJECTED" } });
  } catch (error) {
    console.log('update exam failed', error);
  }
}

// worker Saga: will be fired on "UPDATE_EXAM_AWAITING_APPROVAL" actions
function* updateExamAwaitingApproval(action) {
  //when an exam is neither approved or rejected it's "awaiting approval";
  // here's what runs if status needs to be set back to that state
  const ap = action.payload;
  //ap.exam_id
  try {
    yield axios.put(`/api/exam/status/${ap.exam_id}`, { status: "AWAITING APPROVAL" });
    yield put({ type: 'SET-UPDATE_SELECTED_EXAM', payload: { exam_status: "AWAITING APPROVAL" } });
  } catch (error) {
    console.log('update exam failed', error);
  }
}

function* setExamPhoto(action) {
  //photo (face photo) for a student's exam
  const ap = action.payload;
  //ap.event is the event object to update, 
  //including event_name, test_id, proctor_id, event_date, event_time
  //event_end_time, url, last_modified_by, and id
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/exam/photo`,
      data: ap
    });
    yield put({ type: 'SET_SELECTED_EXAM', payload: response.data });
  } catch (error) {
    console.log('setExamPhoto failed', error);
  }
}

function* setIdPhoto(action) {
  //photo (id photo) for a student's exam
  const ap = action.payload;
  //ap.event is the event object to update, 
  //including event_name, test_id, proctor_id, event_date, event_time
  //event_end_time, url, last_modified_by, and id
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/exam/id-image`,
      data: ap
    });
    yield put({ type: 'SET_SELECTED_EXAM', payload: response.data });
    ap.done()
  } catch (error) {
    console.log('setIdPhoto failed', error);
  }
}



function* confirmId(action) {
  //when proctor compares the face and ID photos of a student's exam and clicks approve/deny, this runs
  const ap = action.payload;
  //ap.event is the event object to update, 
  //including event_name, test_id, proctor_id, event_date, event_time
  //event_end_time, url, last_modified_by, and id
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/exam/confirm-id`,
      data: ap
    });
    yield put({ type: 'FETCH_SELECTED_EXAM', payload: {exam_id: ap.exam_id} });
    yield put({ type: 'FETCH_EVENT_EXAMS', payload: {event_id: ap.event_id} });

    ap.done()
  } catch (error) {
    console.log('confirmId failed', error);
  }
}

export default eventSaga;

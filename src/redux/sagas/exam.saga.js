import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

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
  //dispatch({ type: 'FETCH_SELECTED_EXAM', payload: {exam_id: putSomethingHere} }); 
  yield takeLatest('APPROVE_EXAM', approveExam);
  //dispatch({ type:'APPROVE_EXAM', payload: {exam_id: exam.exam_id} })
  yield takeLatest('REJECT_EXAM', rejectExam);
  //dispatch({ type:'REJECT_EXAM', payload: {exam_id: exam.exam_id} })
  yield takeLatest('PASS_EXAM', passExam);
  //dispatch({ type:'PASS_EXAM', payload: {exam_id: exam.exam_id} })
  yield takeLatest('FAIL_EXAM', failExam);
  //dispatch({ type:'FAIL_EXAM', payload: {exam_id: exam.exam_id} })
  yield takeLatest('FETCH_EXAM_QUESTION_PROCTOR', fetchExamQuestionProctor);
  //dispatch({ type:'FETCH_EXAM_QUESTION_PROCTOR', payload: {exam_id: exam.id} });
  yield takeLatest('ADD_INCIDENT', addIncident);
  //dispatch({ type:'ADD_INCIDENT', payload: {exam_detail: exam_detail} });
  yield takeLatest('CHANGE_HELP_STATUS', changeHelpStatus);
  //dispatch({ type:'CHANGE_HELP_STATUS', payload: {help: value} });

}

// worker Saga: will be fired on "CHANGE_HELP_STATUS" actions
function* changeHelpStatus(action) {
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
                    yield axios.put(`/api/exam/passFail/${ap.exam_id}`, { pass: "PASS" });

    yield put({ type: 'SET-UPDATE_SELECTED_EXAM', payload: { incident: response.data.incident } });
  } catch (error) {
    console.log('update increment incident failed', error);
  }
}

function* createExamDetailRecord(action) {
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
    console.log('setExamPhoto failed', error);
  }
}

function* acceptTerms(action) {
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
    console.log('setExamPhoto failed', error);
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
    // yield put({ type: 'SET_SELECTED_EXAM', payload: response.data });
  } catch (error) {
    console.log('setExamPhoto failed', error);
  }
}

 // worker Saga: will be fired on "FETCH_EXAM_QUESTION_PROCTOR" actions
function* fetchExamQuestionProctor(action){
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
    const response = yield axios.get('/api/exam/selected', { params: {exam_id: ap.exam_id} });
    yield put({ type: 'SET_SELECTED_EXAM', payload: response.data });
  } catch (error) {
    console.log('get selected exam request failed', error);
  }
}

 // worker Saga: will be fired on "FETCH_MY_EXAMS" actions
 function* fetchMyExams(action) {
  const ap = action.payload;
  console.log(ap);
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
    yield console.log('exam_deatil_results', exam.data);
    const score = yield () => {
     let scoreSum = 0
    for(let i=0; i<exam.data.length; i++){
      console.log('point value:', exam.data[i].point_value, 'correct:', exam.data[i].correct );
      if(exam.data[i].correct === true){
        scoreSum += exam.data[i].point_value
      }
    }
    return scoreSum
  }
    yield put({ 
      type: 'SCORE_EXAM', 
      payload: {
        exam_id:ap.exam_id,
        score: score()
    }});
    yield put({ type: 'UNSET_SELECTED_EXAM'});
    yield put({ type: 'UNSET_SELECTED_EXAM_DETAIL'});
    yield ap.done()
  } catch (error) {
    console.log('update end exam put failed', error);
  }
}

function* scoreExam(action) {
  const ap = action.payload;
  try {
    const response = yield axios({
      method: 'PUT',
      url: `/api/exam/score-exam`,
      data: ap
    });
  } catch (error) {
    console.log('setExamPhoto failed', error);
  }
}

// worker Saga: will be fired on "PASS_EXAM" actions
function* passExam(action) {
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
  const ap = action.payload;
  //ap.exam_id
  try {
    yield axios.put(`/api/exam/status/${ap.exam_id}`, { status: "REJECTED" });
    yield put({ type: 'SET-UPDATE_SELECTED_EXAM', payload: { exam_status: "REJECTED" } });
  } catch (error) {
    console.log('update exam failed', error);
  }
}




function* setExamPhoto(action) {
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
    console.log('');
    //todo ^ @Amanda - definitely need to verify that this works correctly
  } catch (error) {
    console.log('setExamPhoto failed', error);
  }
}

function* setIdPhoto(action) {
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
    yield put({ type: 'SET_SELECTED_EXAM', payload: response.data });
    ap.done()
  } catch (error) {
    console.log('confirmId failed', error);
  }
}

export default eventSaga;

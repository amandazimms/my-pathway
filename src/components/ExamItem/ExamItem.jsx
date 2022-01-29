import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';


function ExamItem(props) {

  const store = useSelector((store) => store);
  const selectedExam = useSelector(store => store.exam.selected);

  const [exam, setExam] = useState(props.exam);

  const dispatch = useDispatch();

  const setSelectedExam = (_exam) => {
    console.log('clicked edit exam');
    dispatch({ type: 'SET_SELECTED_EXAM', payload: _exam });
  }

  return (
    <div>
      <h2>I'm an exam</h2>
      <p>stringified exam:{JSON.stringify(exam)}</p>

      <Link to="/exam" onClick={() => setSelectedExam(exam)}>
        {/* when the edit button is clicked, this will move user to the /exam page, and set the selectedExam to this one */}
        <button>Edit this exam</button>
      </Link>
    </div>
  );
}

export default ExamItem;

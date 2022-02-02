import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

function ExamPage(props) {
  
  const exam = useSelector(store => store.exam.selected);
  const user = useSelector(store => store.user);

  return (
    <div>
      <h2>This is one Exam</h2>
      <p>This exam, stringified: {JSON.stringify(exam)}</p>
      

    </div>
  );
}

export default ExamPage;

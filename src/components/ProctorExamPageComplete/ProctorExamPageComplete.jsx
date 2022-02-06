import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

function ProctorExamPageComplete(props) {
  const exam = useSelector(store => store.exam.selected);


  return (
    <div>
      <h2>Completed Exam</h2>
      <p>Selected exam:{JSON.stringify(exam)}</p>
      

    </div>
  );
}

export default ProctorExamPageComplete;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import ExamItem from '../ExamItem/ExamItem';


function ExamList(props) {
  // const exams = useSelector(store => store.exam.all);
  const exams = ["fakeExam1", "fakeExam2"]
  const dispatch = useDispatch();

  // const [heading, setHeading] = useState('Functional Component');

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_EXAMS' }); 
  }, []);

  return (
    <div>
      <h2>Here is all the exams!</h2>

      <p>all exams stringified: {JSON.stringify(exams)}</p>

      {exams.map(exam => (
        // <ExamItem exam={exam} key={exam.id}/>
        <ExamItem exam={exam}/>
      ))}

    </div>
  );
}

export default ExamList;

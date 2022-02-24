import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import MyExamsList from '../MyExamList/MyExamList';


function myExamsFunction(props) {
  //simple job, as shown - could be refactored to combine with MyExamsList

  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('My Exams');

  return (
    <div>
      <MyExamsList />
    </div>
  );
}

export default myExamsFunction;

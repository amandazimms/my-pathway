import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import {Select, MenuItem, FormControl, InputLabel, makeStyles} from "@material-ui/core"


export default function QuestionForm() {

  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  



  return (
   <div className="quesitonForm">
     <h2>Hello!</h2>

<FormControl>
     <Select>
       <MenuItem value={10}>Ten</MenuItem>
       <MenuItem value={20}>Ten</MenuItem>
       <MenuItem value={30}>Ten</MenuItem>
       <MenuItem value={40}>Ten</MenuItem>
     </Select>
     </FormControl>
   </div>
  );
}

export default QuestionForm;

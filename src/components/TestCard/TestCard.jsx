import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from "react-router-dom"; 
import testHeader from "../../images/testHeader.png"; 
import "../TestCard/TestCard.css"
import SimpleDateTime  from 'react-simple-timestamp-to-date';

//Material-UI imports 
import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TodayIcon from '@mui/icons-material/Today';
import IconButton from '@mui/material/IconButton';

function TestCard(props) {
  /*
    Child of TestList when a proctor is viewing all tests
  */

  const store = useSelector(store => store);
  const [test, setTest] = useState(props.test);
  const tests = useSelector(store => store.test.selected);
  const history = useHistory(); 

  const dispatch = useDispatch();
  const [heading, setHeading] = useState('Functional Component');
  
  const selectedTest = useSelector(store => store.test.selected);

  const setSelectedTest = (_test) => {
    // console.log('clicked edit test');
    dispatch({ type: 'SET_SELECTED_TEST', payload: _test });
  //navigate to /testpage 
    history.push("/test")
  }

  
  return (
    <div>
    <Card style={{maxWidth: 345}} className="testCard" onClick={()=> setSelectedTest(test)}>
      <CardMedia
        component="img"
        className="cardImg"
        height="140"
        image={testHeader}
        /> 
        

        <CardContent className="testCardBody">
          <h2 className="testCardName text">{props.test.title}</h2>
          <div className="cardCreateDate">
            <SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{props.test.create_date}</SimpleDateTime>
          </div>
        </CardContent>

        
        <CardActions disableSpacing>
          <IconButton aria-label="edit test">
            <MoreHorizIcon /> 
          </IconButton>
        </CardActions>
    </Card>
    
     {/* <div>
      <h2>I'm a test</h2>
       <p>stringified test:{JSON.stringify(test)}</p> */}

       {/* <Link to="/test" onClick={() => setSelectedTest(test)}>
         {/* when the edit button is clicked, this will move user to the /test page, and set the selectedTest to this one */}
        {/* <button>Edit this test</button>
      </Link> */} 
     </div>
    // </div>
    
  );
}

export default TestCard;

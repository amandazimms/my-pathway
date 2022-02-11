import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ExamQuestion from '../ExamQuestion/ExamQuestion';
import Button from '@mui/material/Button'
import MessageSession from '../Chat/MessageSession'
import { useEffect } from 'react';
import Grid from '@mui/material/Grid'; 
import '../ExamRoomPage/ExamRoomPage.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ExamRoomPage(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const store = useSelector((store) => store);
    const [heading, setHeading] = useState('Functional Component');
    const [helpNeeded, setHelpNeeded] = useState(false);
    const dispatch = useDispatch();
    const examQuestions = useSelector(store => store);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [examBegin, setExamBegin] = useState(false);

    useEffect(() => {
        dispatch({
            type: 'FETCH_ALL_EXAM_QUESTIONS',
            payload: {
                parent_test_id: 2,

            }
        })
    }, [])

    const setSelection=(answer) => {
        setSelectedAnswer(answer); 
    }

    return (
        <div>
            { !examBegin
            
           ? 

              <Grid container justifyContent="center" className="formPanel" alignItems="center" >
                  <div> 
                      <h2 className="instructions"> Please take your time on each question, once you have selected an answer and clicked 'next' you will not be able to return to that question. Please double check your answers before moving on. Once you click on the 'Begin Exam' button your time will begin. </h2> 
                  </div>
               <Button onClick={() => { setExamBegin(true) }} size="large" variant="contained" className="beginBtn">Begin Exam</Button>
               </Grid> 
            
           : <>
           <Button>End Exam</Button>
            <p>{JSON.stringify(selectedAnswer)}</p>
            <ExamQuestion setSelection={setSelection} />

            <Button>Next</Button>
            {!helpNeeded
                ?
                <Button onClick={() => { setHelpNeeded(true) }}>Raise your hand</Button>

                : <> <MessageSession />
                    <Button onClick={() => { setHelpNeeded(false) }}>Put your hand down</Button>
                </>
            }
            </>
            }
        </div>
    );
}

export default ExamRoomPage;
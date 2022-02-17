import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ExamQuestion from '../ExamQuestion/ExamQuestion';
import Button from '@mui/material/Button'
import MessageSession from '../Chat/MessageSession'
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import '../ExamRoomPage/ExamRoomPage.css'
import AreYouSureButton from '../AreYouSureButton/AreYouSureButton';
import { useHistory } from 'react-router-dom';

function ExamRoomPage(props) {
    const store = useSelector((store) => store);
    const exam = useSelector(store=>store.exam.selected);
    const [heading, setHeading] = useState('Functional Component');
    const [helpNeeded, setHelpNeeded] = useState(false);
    const dispatch = useDispatch();
    const examQuestions = useSelector(store => store);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [answerCorrect, setAnswerCorrect] = useState(false);
    const [examBegin, setExamBegin] = useState(false);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0)

    const beginExam = () => {
        if (store.message.activeMessageSession === "") {
            dispatch({
                type: 'CREATE_MESSAGE_SESSION',
                payload: {
                    userId: store.user.id,
                    examId: store.exam.selected.exam_id,
                    done: () => {
                        setExamBegin(true)
                    }
                }
            })
        } else {
            setExamBegin(true)
        }
        dispatch({
            type: 'UNSET_ACTIVE_MESSAGE_DETAIL'
        })

        dispatch({
            type: 'BEGIN_EXAM',
            payload: {
                exam_id: store.exam.selected.exam_id
            }
        })
        dispatch({
            type: 'CREATE_EXAM_DETAIL_RECORD',
            payload: {
                exam_id: store.exam.selected.exam_id,
                question_id: store.question.examSelected.id
            }
        })
        dispatch({
            type: 'UPDATE_ACTIVE_EXAM_QUESTION',
            payload: {
                user_id: store.user.id,
                exam_id: store.exam.selected.exam_id,
                question_id: store.question.examSelected.id
            }
        })
    }

    const setSelection = (answer) => {
        setSelectedAnswer(answer);
        checkAnswer(answer)
    }

    const checkAnswer = (answer) => {
        if(answer === store.question.examSelected.answer){
            setAnswerCorrect(true)
       }
       else{
           setAnswerCorrect(false) 
       }
    }

    const nextQuestion = () => {
        if (selectedAnswer === '') {
            alert('No answer Slected')
        } else {
            setSelectedQuestionIndex(selectedQuestionIndex + 1)
            setSelectedAnswer('')
            updateQuestionIndex() 
            createExamDetailRecord()
            updateActiveQuestion()
            captureAnswer()
        }
    }

    const captureAnswer = () => {
        console.log('Capturing answer!');
        dispatch({
            type: 'CAPTURE_ANSWER',
            payload: {
                exam_detail_id: store.exam.detail.id,
                selected_answer: selectedAnswer,
                correct: answerCorrect
            }
        })
    }

    const updateActiveQuestion = () => {
        dispatch({
            type: 'UPDATE_ACTIVE_EXAM_QUESTION',
            payload: {
                user_id: store.user.id,
                exam_id: store.exam.selected.exam_id,
                question_id: store.question.examAll[selectedQuestionIndex + 1].id
            }
        })
    }

    const updateQuestionIndex = () => {
        dispatch({
            type: 'SET_SELECTED_EXAM_QUESTIONS',
            payload: store.question.examAll[selectedQuestionIndex + 1]
        })
    }
    
    const createExamDetailRecord = () => {
        console.log('createExamDetailRecord');
        dispatch({
            type: 'CREATE_EXAM_DETAIL_RECORD',
            payload: {
                exam_id:store.exam.selected.exam_id,
                question_id: store.question.examAll[selectedQuestionIndex + 1].id
            }
        })
    }

    const history = useHistory()

    const completeExam = () => {
        if(confirm('Are you sure you want to complete the exam?')){
        captureAnswer()
        dispatch({
            type: 'END_EXAM',
            payload:{
                exam_id:store.exam.selected.exam_id,
                done: () => {
                    history.push('/home')
                }
            }
        })
        }
    }

    const abortExam = () => {
        if(confirm('Are you sure you want to abort this exam? It cannot be undone, and you cannot return to the exam later. If you are unsure, please contact your proctor before proceeding.')){
            dispatch({
                type: 'END_EXAM',
                payload:{
                    exam_id:store.exam.selected.exam_id,
                    done: () => {
                        history.push('/home')
                    }
                }
            })
            }
    }

    const changeHandRaiseStatus = (value) => {
        setHelpNeeded(value)
        dispatch({ type:'CHANGE_HELP_STATUS', payload: {help: value, exam_id: exam.exam_id} });
    }

    return (
        <div>
            {!examBegin ?
                <Grid container justifyContent="center" className="formPanel" alignItems="center" >
                    <div>
                        <h2 className="instructions"> Please take your time on each question, once you have selected an answer and clicked 'next' you will not be able to return to that question. Please double check your answers before moving on. Once you click on the 'Begin Exam' button your time will begin. </h2>
                    </div>
                    <Button onClick={beginExam} size="large" variant="contained" className="beginBtn">Begin Exam</Button>
                </Grid>

                : <>
                    <Button onClick={abortExam}>Abort Exam</Button>
                    <div className="ExamFlex">
                    <ExamQuestion
                        setSelection={setSelection}
                        selectedAnswer={selectedAnswer}
                    />
                    <MessageSession />
                    </div>
                    {selectedQuestionIndex != store.question.examAll.length - 1 ?
                        // <Button onClick={nextQuestion}>Next</Button> 
                        <AreYouSureButton
                            beginningText={"Next"}
                            areYouSureText={"Are you sure?, Click to Proceed"}
                            onButtonClick={nextQuestion}
                            beginningVariant={"outlined"}
                            areYouSureVariant={"contained"}
                        />
                        :
                        // <Button onClick={completeExam}>Complete Exam</Button>
                        <AreYouSureButton
                            beginningText={"Complete Exam"}
                            areYouSureText={"Are you sure?, Click to Proceed"}
                            onButtonClick={completeExam}
                            beginningVariant={"outlined"}
                            areYouSureVariant={"contained"}
                        />
                    }
                    {!helpNeeded
                        ?
                        <Button onClick={ ()=>changeHandRaiseStatus(true) }>Raise your hand</Button>

                        : <> 
                            <Button onClick={ ()=>changeHandRaiseStatus(false) }>Put your hand down</Button>
                        </>
                    }
                    
                </>
            }
        </div>
    );
}

export default ExamRoomPage;
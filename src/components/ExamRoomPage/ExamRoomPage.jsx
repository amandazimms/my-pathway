import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ExamQuestion from '../ExamQuestion/ExamQuestion';
import Button from '@mui/material/Button'
import MessageSession from '../Chat/MessageSession';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import '../ExamRoomPage/ExamRoomPage.css'
import AreYouSureButton from '../AreYouSureButton/AreYouSureButton';
import { useHistory } from 'react-router-dom';



function ExamRoomPage(props) {

    const store = useSelector((store) => store);
    const exam = useSelector(store => store.exam.selected);
    const [heading, setHeading] = useState('Functional Component');
    const dispatch = useDispatch();
    const examQuestions = useSelector(store => store);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [answerCorrect, setAnswerCorrect] = useState(false);
    const [examBegin, setExamBegin] = useState(false);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0)

    const test = useSelector(store => store.test.selected);
    const [testName, setTestName] = useState(test.title)

    const fetchRepeating = () => {
        //runs every {3s} while this page is open
        fetchMyExam();
        const getMessageTimer = setInterval(() => { fetchMyExam() }, 3000);
        return () => clearInterval(getMessageTimer)
    }

    useEffect(() => {
        fetchRepeating();
    }, []);

    const fetchMyExam = () => {
        dispatch({ type: "FETCH_SELECTED_EXAM", payload: { exam_id: exam.exam_id } });
    }

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
        if (answer === store.question.examSelected.answer) {
            setAnswerCorrect(true)
        }
        else {
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
                exam_id: store.exam.selected.exam_id,
                question_id: store.question.examAll[selectedQuestionIndex + 1].id
            }
        })
    }

    const history = useHistory()

    const completeExam = () => {
        if (confirm('Are you sure you want to complete the exam?')) {
            captureAnswer()
            dispatch({
                type: 'END_EXAM',
                payload: {
                    exam_id: store.exam.selected.exam_id,
                    done: () => {
                        history.push('/home')
                    }
                }
            })
        }
    }

    const abortExam = () => {
        if (confirm('Are you sure you want to abort this exam? It cannot be undone, and you cannot return to the exam later. If you are unsure, please contact your proctor before proceeding.')) {
            dispatch({
                type: 'END_EXAM',
                payload: {
                    exam_id: store.exam.selected.exam_id,
                    done: () => {
                        history.push('/home')
                    }
                }
            })
        }
    }

    const changeHandRaiseStatus = (value) => {
        dispatch({ type: 'CHANGE_HELP_STATUS', payload: { help: value, exam_id: exam.exam_id } });
    }

    return (
        <div>
            {/* <p>exam:{JSON.stringify(exam)}</p> */}
            {!examBegin ?
                <Grid container justifyContent="center" className="formPanel" alignItems="center" >
                    <div>
                        <h2 className="instructions"> Please take your time on each question, once you have selected an answer and clicked 'next' you will not be able to return to that question. Please double check your answers before moving on. Once you click on the 'Begin Exam' button your time will begin. </h2>
                    </div>
                    <Button onClick={beginExam} size="large" variant="contained" className="beginBtn">Begin Exam</Button>
                </Grid>

                :
                <div className="ExamRoomPage">
                    <h2 className="examHeader">You are in Exam: {store.exam.selected.event_name + ' - ' + store.exam.selected.test_title}</h2>
                    <Button className="abortButton" variant="contained" color="error" onClick={abortExam}>Abort Exam</Button>
                    <h3>Question #{selectedQuestionIndex+1} of {store.question.examAll.length}</h3>
                    <div className="ExamFlex">
                        <div className="questionSection">
                            <ExamQuestion
                                setSelection={setSelection}
                                selectedAnswer={selectedAnswer}
                            />
                            <br />
                            {selectedQuestionIndex != store.question.examAll.length - 1 ?
                                <AreYouSureButton
                                    beginningText={"Confirm Answer"}
                                    areYouSureText={"Are you sure?  Click to Proceed to Next Question"}
                                    onButtonClick={nextQuestion}
                                    beginningVariant={"contained"}
                                    areYouSureVariant={"outlined"}
                                    className="areYouSureExam"
                                />
                                :
                                <AreYouSureButton
                                    beginningText={"Complete Exam"}
                                    areYouSureText={"Are you sure?  Click to Exit Exam."}
                                    onButtonClick={completeExam}
                                    beginningVariant={"contained"}
                                    areYouSureVariant={"outlined"}
                                    className="areYouSureExam"
                                />
                            }
                            <br />
                            <br />
                            {exam.help
                                ? <Button className="areYouSureExam" variant="outlined" color="error" onClick={() => changeHandRaiseStatus(false)}>Hand is rasised, click to cancel</Button>
                                : <Button className="areYouSureExam" variant="outlined" color="success" onClick={() => changeHandRaiseStatus(true)}>Raise your hand for help</Button>
                            }
                        </ div>
                        <div className="messageSessionParent">
                            <div className="messageSession">
                                <MessageSession />
                            </div>
                        </div>
                    </div>


                </div>
            }
        </div>
    );
}

export default (ExamRoomPage);
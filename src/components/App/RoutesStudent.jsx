import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Chat from '../Chat/Chat';
import MessageSession from '../Chat/MessageSession'; 
import NewQuestionModal from '../NewQuestionModal/NewQuestionModal';
import UserManagement from '../UserManagement/UserManagement'
import TestList from '../TestList/TestList';
import TestPage from '../TestPage/TestPage';
import ProctorExamPageComplete from '../ProctorExamPageComplete/ProctorExamPageComplete';
import EventList from '../EventList/EventList';
import EventPage from '../EventPage/EventPage';
import Validation from '../Validation/Validation';
import Compare from '../Compare/Compare'
import BeforeYouBeginPage from '../BeforeYouBeingPage/BeforeYouBeginPage';
import TermsPage from '../TermsOfUsePage/TermsOfUsePage';
import ExamQuestion from '../ExamQuestion/ExamQuestion'; 
import ExamRoomPage from '../ExamRoomPage/ExamRoomPage';
import ProctorExamPageInProgress from '../ProctorExamPageInProgress/ProctorExamPageInProgress';
import MyExams from '../MyExams/MyExams';
import StudentExamPageComplete from '../StudentExamPageComplete/StudentExamPageComplete';


function RoutesStudent() {

  return (
    <>
    {/* <p>routes student</p> */}

      <Switch>
      {/* ------ STUDENT only routes ------------------------------- */}
        <Redirect exact from="/" to="/home" />

        <Route exact path="/about">
          <AboutPage />
        </Route>

        <ProtectedRoute exact path="/user">
          <UserPage />
        </ProtectedRoute>

        <ProtectedRoute exact path="/validation" >
          <Validation />
        </ProtectedRoute>
        
        <ProtectedRoute exact path="/exam-room" >
          <ExamRoomPage />
        </ProtectedRoute>

        <ProtectedRoute exact path="/my-exams" >
          <MyExams />
        </ProtectedRoute>

        <ProtectedRoute exact path="/student-exam-complete" >
          <StudentExamPageComplete />
        </ProtectedRoute>
        
        <ProtectedRoute exact path="/before-begin" >
          <BeforeYouBeginPage />
        </ProtectedRoute>

        <ProtectedRoute exact path="/terms-of-use" >
          <TermsPage />
        </ProtectedRoute>

        <Route exact path="/login" >
          <Redirect to="/my-exams" />
        </Route>

        <Route exact path="/registration" >
          <Redirect to="/my-exams" />
        </Route>

        <Route exact path="/home">
          <Redirect to="/my-exams" />
        </Route>
      </Switch>
    </>
  );
}

export default RoutesStudent;

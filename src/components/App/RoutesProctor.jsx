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


function RoutesProctor() {

  return (
    <>
      {/* <p>routes proctor</p> */}
      <Switch>
        
        <Redirect exact from="/" to="/home" />

        <Route exact path="/about">
          <AboutPage />
        </Route>
      {/* ------ PROCTOR only routes: CREATE / MANAGE TESTS ------------------ */}
        <ProtectedRoute exact path="/test-new" >
          <TestPage new={true} />
        </ProtectedRoute>

        <ProtectedRoute exact path="/test">
          <TestPage new={false} />
        </ProtectedRoute>

        <ProtectedRoute exact path="/tests-all">
          <TestList />
        </ProtectedRoute>

      {/* ------ PROCTOR only routes: CREATE / MANAGE EVENTS ------------------ */}
        <ProtectedRoute exact path="/event-new" >
          <EventPage new={true} />
        </ProtectedRoute>

        <ProtectedRoute exact path="/event" >
          <EventPage new={false} />
        </ProtectedRoute>

        <ProtectedRoute exact path="/events-all" >
          <EventList />
        </ProtectedRoute>

      {/* ------ PROCTOR only routes: PROCTOR EXAMS ------------------ */}
        <ProtectedRoute exact path="/validation" >
          <Validation />
        </ProtectedRoute>

        <ProtectedRoute exact path="/compare" >
          <Compare />
        </ProtectedRoute>

        <ProtectedRoute exact path="/proctor-exam-complete" >
          <ProctorExamPageComplete />
        </ProtectedRoute>

        <ProtectedRoute exact path="/proctor-exam-in-progress" >
          <ProctorExamPageInProgress />
        </ProtectedRoute>

      {/* ------ PROCTOR only routes: USERS ------------------ */}
        <ProtectedRoute exact path="/user">
          <UserPage />
        </ProtectedRoute>
        
        <ProtectedRoute exact path="/user_management">
          <UserManagement />
        </ProtectedRoute>

        <Route exact path="/login" >
          <Redirect to="/events-all" />
        </Route>

        <Route exact path="/registration" >
          <Redirect to="/events-all" />
        </Route>

        <Route exact path="/home">
          <Redirect to="/events-all" />
        </Route>


        {/* //TODO possibly can eventually delete the routes between $$$

          {/* ExamRoomPage - this one is for students above - proctors don't need? */}
          <ProtectedRoute exact path="/exam-room" >
            <ExamRoomPage />
          </ProtectedRoute>
        {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */}
      </Switch>
    </> 
  );
}

export default RoutesProctor;

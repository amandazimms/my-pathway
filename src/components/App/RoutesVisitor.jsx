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


function RoutesVisitor() {

  return (
    <>
    {/* <p>routes visitor</p> */}

      <Switch>
        <Redirect exact from="/" to="/home" />

        <Route exact path="/about">
          <AboutPage />
        </Route>

        <Route exact path="/login" >
          <LoginPage />
        </Route>

        <Route exact path="/registration" >
          <RegisterPage />
        </Route>

        <Route exact path="/home">
          <LoginPage />
        </Route>

        <Route>
          <h1 className="heading">404</h1>
        </Route>
      </Switch>
    </>
  );
}

export default RoutesVisitor;

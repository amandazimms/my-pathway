import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
// import AboutPage from '../AboutPage/AboutPage';
// import UserPage from '../UserPage/UserPage';
// import LandingPage from '../LandingPage/LandingPage';
// import LoginPage from '../LoginPage/LoginPage';
// import RegisterPage from '../RegisterPage/RegisterPage';
// import Chat from '../Chat/Chat';
// import MessageSession from '../Chat/MessageSession'; 
// import NewQuestionModal from '../NewQuestionModal/NewQuestionModal';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import UserManagement from '../UserManagement/UserManagement'
// import TestList from '../TestList/TestList';
// import TestPage from '../TestPage/TestPage';
// import ProctorExamPageComplete from '../ProctorExamPageComplete/ProctorExamPageComplete';
// import EventList from '../EventList/EventList';
// import EventPage from '../EventPage/EventPage';
// import Validation from '../Validation/Validation';
// import Compare from '../Compare/Compare'
// import BeforeYouBeginPage from '../BeforeYouBeingPage/BeforeYouBeginPage';
// import TermsPage from '../TermsOfUsePage/TermsOfUsePage';
// import ExamQuestion from '../ExamQuestion/ExamQuestion'; 
// import ExamRoomPage from '../ExamRoomPage/ExamRoomPage';
import NavDrawer from '../Nav/NavDrawer';
// import ProctorExamPageInProgress from '../ProctorExamPageInProgress/ProctorExamPageInProgress';
// import MyExams from '../MyExams/MyExams';
// import StudentExamPageComplete from '../StudentExamPageComplete/StudentExamPageComplete';
import RoutesStudent from './RoutesStudent';
import RoutesProctor from './RoutesProctor';
import RoutesVisitor from './RoutesVisitor';

const theme = createTheme({

  palette: {
    primary: {
      main: '#1E2A49',
    },
    secondary: {
      main: '#7FC1C5',
    },
    error: {
      main: 'rgba(236,58,45,0.97)',
    },
    warning: {
      main: '#ff9906',
    },
    success: {
      main: '#46b54b',
    },
  },

  typography: {
    fontFamily: 'Nunito Sans',
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightRegular: 400,
    fontWeightBold: 600,
  },
});

function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <NavDrawer /> 
          <Nav />
          {
             user.id  && user.role === "STUDENT" ? <RoutesStudent/>
            : user.id  && user.role === "PROCTOR" ? <RoutesProctor/> 
            : <RoutesVisitor/>
          }
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

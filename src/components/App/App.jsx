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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Chat from '../Chat/Chat';
import MessageSession from '../Chat/MessageSession'; 
import NewQuestionModal from '../NewQuestionModal/NewQuestionModal';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserManagement from '../UserManagement/UserManagement'
import TestList from '../TestList/TestList';
import TestPage from '../TestPage/TestPage';
import ExamList from '../ExamList/ExamList';
import ExamPage from '../ExamPage/ExamPage';
import EventList from '../EventList/EventList';
import EventPage from '../EventPage/EventPage';
import Validation from '../Validation/Validation';
import Compare from '../Compare/Compare'
import BeforeYouBeginPage from '../BeforeYouBeingPage/BeforeYouBeginPage';
import TermsPage from '../TermsOfUsePage/TermsOfUsePage';

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
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route exact path="/about">
              {/* // shows AboutPage at all times (logged in or not) */}
              <AboutPage />
            </Route>

            {/* //USER ----------------------------- */}
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute exact path="/user">
              {/* // logged in shows UserPage else shows LoginPage */}
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/user_management">
              {/* // logged in shows InfoPage else shows LoginPage */}
              <UserManagement />
            </ProtectedRoute>

            {/* //CHAT ----------------------------- */}
            <ProtectedRoute exact path="/chat" >
              {/* // logged in shows UserPage else shows LoginPage */}
              <Chat />
            </ProtectedRoute>

            <ProtectedRoute exact path="/message_session" >
              {/* // logged in shows UserPage else shows LoginPage */}
              <MessageSession />
            </ProtectedRoute>

            <ProtectedRoute exact path="/validation" >
              {/* // logged in shows UserPage else shows LoginPage */}
              <Validation />
            </ProtectedRoute>

            <ProtectedRoute exact path="/compare" >
              {/* // logged in shows UserPage else shows LoginPage */}
              <Compare />
            </ProtectedRoute>

            {/* //TESTS ----------------------------- */}
            <ProtectedRoute exact path="/test-new" >
              {/* // logged in shows TestPage (with new = true as props) else shows LoginPage */}
              <TestPage new={true} />
            </ProtectedRoute>

            <ProtectedRoute exact path="/test">
              {/* // logged in shows TestPage (with new = false as props) else shows LoginPage */}
              <TestPage new={false} />
            </ProtectedRoute>

            <ProtectedRoute exact path="/tests-all">
              {/* // logged in shows TestList else shows LoginPage */}
              <TestList />
            </ProtectedRoute>

            {/* //EVENTS ----------------------------- */}
            <ProtectedRoute exact path="/event-new" >
              {/* // logged in shows EventPage (with new = true as props) else shows LoginPage */}
              <EventPage new={true} />
            </ProtectedRoute>

            <ProtectedRoute exact path="/event" >
              {/* // logged in shows EventPage (with new = false as props) else shows LoginPage */}
              <EventPage new={false} />
            </ProtectedRoute>

            <ProtectedRoute exact path="/events-all" >
              {/* // logged in shows EventList else shows LoginPage */}
              <EventList />
            </ProtectedRoute>

            {/* //EXAMS ----------------------------- */}
            <ProtectedRoute exact path="/exam" >
              {/* // logged in shows ExamPage else shows LoginPage */}
              <ExamPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/exams-all" >
              {/* // logged in shows ExamList else shows LoginPage */}
              <ExamList />
            </ProtectedRoute>

            <ProtectedRoute exact path="/before-begin" >
              {/* // logged in shows ExamList else shows LoginPage */}
              <BeforeYouBeginPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/terms" >
              {/* // logged in shows ExamList else shows LoginPage */}
              <TermsPage />
            </ProtectedRoute>






            {/* //LOGIN/REGISTRATION ----------------------------- */}
            <Route exact path="/login" >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/user" />
                // Otherwise, show the login page
                : <LoginPage />
              }
            </Route>

            <Route exact path="/registration" >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                // Otherwise, show the registration page
                : <RegisterPage />
              }
            </Route>

            <Route exact path="/home">
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                // Otherwise, show the Landing page
                : <LandingPage />
              }
            </Route>



            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>

          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

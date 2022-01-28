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
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Chat from '../Chat/Chat';
import MessageSession from '../Chat/MessageSession'; 
import TestItem from '../TestItem/TestItem';
import TestPage from '../TestPage/TestPage'
import TestList from '../TestList/TestList';
import NewQuestionModal from '../NewQuestionModal/NewQuestionModal';
import './App.css';

import {ThemeProvider, createTheme} from '@material-ui/core/styles';

const theme = createTheme ({
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
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/chat"
          >
            <Chat />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/message_session"
          >
            <MessageSession />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows TestPage (with new = true as props) else shows LoginPage
            exact
            path="/test-new"
          >
            <TestPage new={true}/>
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows TestPage (with new = false as props) else shows LoginPage
            exact
            path="/test"
          >
            <TestPage new={false}/>
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows TestList else shows LoginPage
            exact
            path="/test-list"
          >
            <TestList />
          </ProtectedRoute>
         

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/question"
          >
            <NewQuestionModal />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
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

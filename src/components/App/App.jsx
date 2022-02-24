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
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavDrawer from '../Nav/NavDrawer';
import RoutesStudent from './RoutesStudent';
import RoutesProctor from './RoutesProctor';
import RoutesVisitor from './RoutesVisitor';
import ProctorNavDrawer from '../Nav/ProctorNavDrawer';
import StudentNavDrawer from '../Nav/NavDrawer';


const theme = createTheme({
  //theme used across the site
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

function App(props) {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}> 
      <Router>
        <div>
        
          { 
            // if student is logged in, show student nav drawer
             user.id  && user.role === "STUDENT" ? <StudentNavDrawer/>
            // else if proctor is logged in, show proctor nav drawer
            : user.id  && user.role === "PROCTOR" ? <ProctorNavDrawer/> 
            // else, show basic nav bar at the top
            : <Nav /> 
          }
          {
             // if student is logged in, allow student routes
             user.id  && user.role === "STUDENT" ? <RoutesStudent/>
            // else if proctor is logged in, allow proctor routes
            : user.id  && user.role === "PROCTOR" ? <RoutesProctor/> 
            // else, allow visitor route
            : <RoutesVisitor/>
          }
          <Footer />
        </div>
      </Router>

    </ThemeProvider> 

  );
}

export default App;

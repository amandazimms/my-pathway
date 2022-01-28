import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

import {createTheme, ThemeProvider} from '@material-ui/core/styles'

const customTheme = createTheme ({
  typography: {
    fontFamily: 'Nunito Sans',
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightRegular: 400,
    fontWeightBold: 600, 
  },

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
});

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <ThemeProvider theme={customTheme}>
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Kyros</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {user.role === "PROCTOR" && (
          <Link className="navLink" to="/user_management">
            Users
          </Link>
        )}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <Link className="navLink" to="/question">
              Question Form
            </Link>

            <Link className="navLink" to="/chat">
              Chat
            </Link>

            <Link className="navLink" to="/test">
              Create Tests
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
        {user.role === "PROCTOR" && (
          <Link className="navLink" to="/user_management">
            Users
          </Link>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default Nav;


import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import KyrosLogo3 from "../../images/KyrosLogo3.png"



function Nav() {
  const user = useSelector((store) => store.user);

  return (

    <div className="nav">
      <Link to="/home">
        <img src={KyrosLogo3} alt="logo" className="logo" /> 
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

            <Link className="navLink" to="/tests-all">
              All Tests
            </Link>

            <Link className="navLink" to="/events-all">
              All Events
            </Link>

            {/* todo we will still use a similar link for student login - add to app.js */}
            {/* <Link className="navLink" to="/exams-all">
              All Exams
            </Link> */}

            <Link className="navLink" to="/validation">
              Validation
            </Link>

            <Link className="navLink" to="/chat">
              Chat
              {/* this whole link will eventually be removed from Nav - here for quick testing purposes now */}
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
  );
}

export default Nav;


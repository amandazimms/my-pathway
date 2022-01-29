import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';


function Nav() {
  const user = useSelector((store) => store.user);

  return (
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

            <Link className="navLink" to="/tests-all">
              All Tests
            </Link>

            <Link className="navLink" to="/events-all">
              All Events
            </Link>

            <Link className="navLink" to="/exams-all">
              All Exams
            </Link>

            <Link className="navLink" to="/question">
              Question Form
              {/* this whole link will eventually be removed from Nav - here for quick testing purposes now */}
            </Link>

            <Link className="navLink" to="/chat">
              Chat
              {/* this whole link will eventually be removed from Nav - here for quick testing purposes now */}
            </Link>

            <Link className="navLink" to="/test">
              Create Tests
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


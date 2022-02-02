import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Container, Paper } from '@material-ui/core';
import KyrosLogo from "../../images/KyrosLogo.png"; 
import "./LoginPage.css"; 

function LoginPage() {
  const history = useHistory();

  return (
    <Paper className="logInPageContainer">
      <img alt="logo" className="kyros-logo" src={KyrosLogo}/>
      <h1 className="login-h1">Welcome Back</h1>
      <p className="login-p">
        Please sign in to get started!
      </p>
      <LoginForm />
      Not a registered user?
      <br /> 
        <a
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </a>
      </Paper>
  );
}

export default LoginPage;

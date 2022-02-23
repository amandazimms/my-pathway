import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Paper } from '@material-ui/core';
import KyrosLogo from "../../images/KyrosLogo.png"; 
import Button from '@mui/material/Button'
import "./LoginPage.css"; 
import Grid from '@mui/material/Grid';

function LoginPage() {
  //handles a user logging in
  
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <div>
    <Grid container className="loginGrid" spacing={0} justifyContent="center" wrap="wrap" direction="row" alignitem="center">
      <Grid item>
        <Grid
        container
        direction="column"
        justifyContent="center"
        spacing={2}
        className="logInPageContainer"
        >

      <Paper variant="elevation" elevation={2} className="login-background">


      <Grid item>  
      <img alt="logo" className="kyros-logo" src={KyrosLogo}/>
      </Grid>

      <Grid item>
      <h2 className="login-h1">Welcome Back</h2>
      </Grid>

      <Grid item>
          <form className="formPanel" onSubmit={login}>
          {errors.loginMessage && (
            <h2 className="alert" role="alert">
              {errors.loginMessage}
            </h2>
          )}
          <div className='loginContainer'>
              <input
                placeholder='Email/Username'
                className='loginInput'
                type="text"
                name="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
          
            
              <input
                placeholder='Password'
                className='loginInput'
                type="password"
                name="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

          </div>
          <div className="loginButton">
            <Button className="btn-primary loginButton" color="primary" variant="contained" onClick={login}>Login</Button>
          </div>
        </form>
      </Grid> 

      <Grid item>
      Not a registered user?
      <br /> 
      </Grid> 

      <Grid item>
        <Button
          varient="text"
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
        </Grid>

       
        </Paper>
        </Grid> 
        </Grid> 
        </Grid>
      </div>
  );
}

export default LoginPage;

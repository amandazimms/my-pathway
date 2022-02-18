import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Container, Paper } from '@material-ui/core';
import KyrosLogo from "../../images/KyrosLogo.png"; 
import Button from '@mui/material/Button'
import "./LoginPage.css"; 
import Grid from '@mui/material/Grid';


function LoginPage() {
  const history = useHistory();

  return (
    <div>
    <Grid container className="loginGrid" spacing={1} justifyContent="center" wrap="wrap" direction="row" alignitem="center">
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
      <h1 className="login-h1">Welcome Back</h1>
      </Grid>

      <Grid item>
      <LoginForm />
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

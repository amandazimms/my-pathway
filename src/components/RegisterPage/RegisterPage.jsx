import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import './RegisterPage.css'; 
import KyrosLogo from "../../images/KyrosLogo.png"; 
import Container from "@mui/material/Container"; 
import Button from "@mui/material/Button";
import Grid from '@material-ui/core/Grid'; 
import {Paper} from '@material-ui/core'; 

function RegisterPage() {
  /*
    For registering for the app - contains RegisterForm as its child
  */
  const history = useHistory();

  return (
    <div>
    <Grid container spacing={1} justifyContent ="center" wrap="wrap" direction="row" alignitem="center">
      <Grid item>
        <Grid
        container
        direction="column"
        justifyContent="center"
        spacing={2}
        className="logInPageContainer">

      <Paper variant="elevation" elevation={2} className="login-background">
      
      <Grid item>
       <img alt="logo" className="kyros-logo" src={KyrosLogo} /> 
       </Grid>

      <Grid item>
       <h2 className="register-h1">Register</h2>
      </Grid>
      
      <Grid item>
         <RegisterForm /> 
      </Grid>

      <Grid item>
        Already have an account? 
      </Grid>

      <Grid item>  
      <Button
          variant="text" 
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          sign in 
        </Button>
      </Grid>

      </Paper>
      </Grid> 
      </Grid>
      </Grid> 
      </div> 
    
  );
}

export default RegisterPage;

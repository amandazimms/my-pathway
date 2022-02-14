import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button'; 
import { Link } from 'react-router-dom';

function LogOutButton(props) {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type:'UNSET_USER' }); 
    dispatch({ type: 'LOGOUT' });
  }
  return (
    <Link to="/login">
      <Button 
        // This button shows up in multiple locations and is styled differently
        // because it's styled differently depending on where it is used, the className
        // is passed to it from it's parents through React props
        className={props.className}
        onClick={logout}
        variant='contained'
        style={{backgroundColor: 'white'}}
      >
        Log Out
      </Button>
    </Link>
  );
}

export default LogOutButton;

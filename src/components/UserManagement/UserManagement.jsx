import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import AreYouSureButton from '../AreYouSureButton/AreYouSureButton';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function userManagementFunction(props) {
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('USER MANAGEMENT');

  useEffect (() => {
    dispatch ({
      type: 'FETCH_ALL_USERS'
    })
  }, [])

  const updateUserRole = (id) => {
    dispatch({
        type: 'UPDATE_USER_ROLE',
        payload: {
          user_id: store.user.id,
          update_id: id
        }
    });
  }

  return (
    <div>
      <h2 className="heading">{heading}</h2>
      {/* <p>{JSON.stringify(store.allUsers.setAllUsers)}</p> */}
      <TableContainer sx={{ minWidth: 500, maxWidth: 800 }} component={Paper}>
      <Table sx={{ minWidth: 500, maxWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="center">Change Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {store.allUsers.all.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.first_name}
              </TableCell>
              <TableCell align="left">{row.last_name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.role}</TableCell>
              <TableCell align="center">
                {row.role === 'PROCTOR'?
                <Button variant="outlined" disabled>Make Proctor</Button>:
                <AreYouSureButton
                  beginningText={"Make Proctor"}
                  areYouSureText={"Confirm - Make user a PROCTOR?"}
                  onButtonClick={()=>updateUserRole(row.id)}
                  beginningVariant={"outlined"}
                  areYouSureVariant={"contained"}
                />
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default userManagementFunction;

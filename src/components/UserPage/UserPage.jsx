import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import { Box } from '@mui/material';
import ImageDisplay from '../ImageDisplay/ImageDisplay';



function UserPage() {
  /*
    Profile Page
  */
  const user = useSelector((store) => store.user);
  const store = useSelector((store) => store);
  const dispatch = useDispatch()


  return (
    <div className="flexParent">
      <Box className="flexParentVertical">
        <h2 className="heading">Welcome, {user.first_name}!</h2>
        <p>Username: {user.username}</p>

        <ImageDisplay
          url={store.user.profile_picture}
          classToPass={"mediumImageDisplay roundImage blueBorderThicc"}
        />

        <br />
        <LogOutButton className="btn" />      
      </Box>
    </div>
  );
}

export default UserPage;

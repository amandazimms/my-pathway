import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'; 
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MicIcon from '@mui/icons-material/Mic';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import '../BeforeYouBeingPage/BeforeYouBeginPage.css'
import { Link } from 'react-router-dom';

/*
  This component is rendered when a student is about to take their test, showing all the warnings etc.
*/

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
  }));

  const useStyles = makeStyles((theme) => ({
    avatar: {
      backgroundColor: '#1E2A49',
      border: `1px solid ${theme.palette.info.main}`,
    }
  }));

function BeforeYouBeginPage(props) {
  const store = useSelector((store) => store);

  return (
    <div>

    <Grid container justifyContent="center" spacing={1}>
     
     <Grid item xs={12}>
      <h1 className="pageHeading">BEFORE YOU BEGIN...</h1>
     </Grid> 
      

    <Grid item xs={10}>
        <Item>
    <Avatar className="avatar" style={{ backgroundColor: '#1E2A49'}} >
        <FeaturedVideoIcon className="beginIcon" fontSize="large" style={{color: '#7FC1C5'}}/> 
        </Avatar>
     <h2 className='subheading noTopMargin'>Have a valid photo ID with you</h2>
         <h3 className='body'>A current drivers' license, passport, or state-issued identification card are all acceptable forms of ID. 
         In the next screen you will be asked to hold your ID up to your webcam to take a photo to help us verify that you're the one taking the test.</h3>
         </Item>
     </Grid> 

      <Grid item xs={10}>
          <Item>
          <Avatar className="avatar" style={{ backgroundColor: '#1E2A49' }}>
            <RemoveRedEyeIcon className="beginIcon" style={{color: '#7FC1C5'}}/> 
        </Avatar>
          <h2 className='subheading noTopMargin'>Keep your eyes on the test</h2>
         <h3 className='body'>To ensure the integrity of your exam, please avoid looking away from your computer screen.</h3>
         </Item>
     </Grid> 

      <Grid item xs={10}>
          <Item>
          <Avatar className="avatar" style={{ backgroundColor: '#1E2A49' }}>
            <VolumeOffIcon className="beginIcon" style={{color: '#7FC1C5'}}/> 
        </Avatar>
          <h2 className='subheading noTopMargin'>Ensure a quiet enviornment</h2>
         <h3 className='body'>No outside help is allowed. Nearby voices can render your exam invalid.</h3>
     </Item>
     </Grid> 

      <Grid item xs={10}>
          <Item>
          <Avatar className="avatar" style={{ backgroundColor: '#1E2A49' }}>
            <MicIcon className="beginIcon" style={{color: '#7FC1C5'}}/> 
        </Avatar>
          <h2 className='subheading noTopMargin'>Turn your microphone on</h2>
         <h3 className='body'>Please make sure your microphone is on and working, and that the volume is at an audible level. 
         Your browser may require you to allow microphone permissions for this.</h3>
         </Item>
     </Grid> 

      <Grid item xs={10}>
          <Item>
          <Avatar className="avatar" style={{ backgroundColor: '#1E2A49' }}>
            <FilterNoneOutlinedIcon className="beginIcon" style={{color: '#7FC1C5'}}/> 
        </Avatar>
          <h2 className='subheading noTopMargin'>Do not open new tabs or aplications</h2>
         <h3 className='body'>Use of additional tabs and other applications during this exam is prohibited. Be sure not to open any or your exam results may be rejected.</h3>
         </Item>
     </Grid> 
</Grid> 
<br></br>
<Grid container justifyContent="center" spacing={1}> 
     <Grid item xs={1} justifyContent="flex-end">
         <Item className="btn">
     <Button> {'<'}</Button>
     </Item>
    </Grid> 

     <Grid item xs={3} justifyContent="flex-end">
         <Item className="btn">
     <Link to="/terms-of-use"> 
     <Button>Next  &nbsp; &nbsp;  {'>'}</Button> 
    </Link>
     </Item>
   </Grid> 
      </Grid>
     
    </div>
  );
}

export default BeforeYouBeginPage;
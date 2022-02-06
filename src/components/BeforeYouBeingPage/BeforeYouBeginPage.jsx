import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
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
import { ClassNames } from '@emotion/react';
import '../BeforeYouBeingPage/BeforeYouBeginPage.css'
import { Mic } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const useStyles = makeStyles((theme) => ({
    avatar: {
    //   backgroundColor: theme.palette.grey[50],
      border: `1px solid ${theme.palette.info.main}`,
    //   color: theme.palette.info.main
    }
  }));

function BeforeYouBeginPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  return (
    <div>

    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
     
      <Box gridColumn="span 12">
      <h1 className="pageHeading">BEFORE YOU BEGIN...</h1>
      </Box>
      

      <Box gridColumn="span 10">
          <Item> 
          <Avatar className="avatar">
            <FeaturedVideoIcon className="beginIcon" fontSize="large"/> 
        </Avatar>
          <h2 className='subheading'>Have a valid photo ID with you</h2>
         <h3 className='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi turpis at velit libero, enim elementum consectetur luctus. A, proin ornare nulla nunc.</h3>
        </Item>
      </Box>

      <Box gridColumn="span 10">
          <Item>
          <Avatar className="avatar">
            <RemoveRedEyeIcon className="beginIcon"/> 
        </Avatar>
          <h2 className='subheading'>Keep your eyes on the test</h2>
         <h3 className='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi turpis at velit libero, enim elementum consectetur luctus. A, proin ornare nulla nunc.</h3>
        </Item>
      </Box>

      <Box gridColumn="span 10">
          <Item>
          <Avatar className="avatar">
            <VolumeOffIcon className="beginIcon"/> 
        </Avatar>
          <h2 className='subheading'>Ensure a quiet enviornment</h2>
         <h3 className='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi turpis at velit libero, enim elementum consectetur luctus. A, proin ornare nulla nunc.</h3>
        </Item>
      </Box>

      <Box gridColumn="span 10">
          <Item>
          <Avatar className="avatar">
            <MicIcon className="beginIcon"/> 
        </Avatar>
          <h2 className='subheading'>Turn your microphone on</h2>
         <h3 className='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi turpis at velit libero, enim elementum consectetur luctus. A, proin ornare nulla nunc.</h3>
        </Item>
      </Box>


      <Box gridColumn="span 10">
          <Item>
          <Avatar className="avatar">
            <FilterNoneOutlinedIcon className="beginIcon"/> 
        </Avatar>
          <h2 className='subheading'>Do not open new tabs or aplications</h2>
         <h3 className='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi turpis at velit libero, enim elementum consectetur luctus. A, proin ornare nulla nunc.</h3>
        </Item>
      </Box>

     <Box gridColumn="span 6">
     <Button>Back</Button>
     </Box>
     <Box gridColumn="span 6">
     <Button>Next</Button>
    </Box>
      </Box>
     
    </div>
  );
}

export default BeforeYouBeginPage;
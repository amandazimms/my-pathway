import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'; 
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import "../TermsOfUsePage/TermsOfUsePage.css"

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
  }));

function TermsPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  const [agree, setAgree] = useState(false);

  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    setAgree(!agree);
  }

  // When the button is clicked
  const btnHandler = () => {
    alert('The buttion is clickable!');
  };

  return (
    <div className="formValidation">
    <Grid container justifyContent="center" alignItems="center" spacing={3}>

        <Grid item xs={8}>
        <h1 className="pageHeading">Terms of Use</h1>
        <h3 className='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi turpis at velit libero, enim elementum consectetur luctus. A, proin ornare nulla nunc.</h3>
        </Grid>

     <Grid item xs={8} justifyContent="flex-end">
        <Item className="btn">
     <Button>Privacy Policy</Button>
     </Item>
    </Grid> 

     <Grid item xs={8} justifyContent="flex-end">
         <Item className="btn">
     <Button>Terms of use</Button>
     </Item>
   </Grid> 

  <Grid item xs={12} justifyContent="center" alignItems="center">
    <div className="checkboxDiv">
   <input type="checkbox" id="agree" onChange={checkboxHandler} />  
   <label htmlFor="agree" style={{ marginLeft: '.5rem' }} > I have read and agree to Pathway's privacy policy and terms of use.</label>  
   </div>
    </Grid>

</Grid> 

<br></br>
<br></br>
<br></br>

<Grid container justifyContent="center" spacing={1}> 
     <Grid item xs={1} justifyContent="flex-end">
         <Item className="btn">
     <Button> {'<'}</Button>
     </Item>
    </Grid> 

     <Grid item xs={3} justifyContent="flex-end">
    <Item className="btn">
     <Button disabled={!agree} className="btn" onClick={btnHandler}>Next  &nbsp; &nbsp;  {'>'}</Button>
     </Item>
   </Grid> 
      </Grid> 
    </div>
  );
}

export default TermsPage;






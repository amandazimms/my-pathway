import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import TestItem from '../TestItem/TestItem';
import TestSettings from '../TestSettings/TestSettings';
import QuestionList from '../QuestionList/QuestionList';

//MUI Imports: 
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function TestPage(props) {
  //This is the page a proctor is brought to upon clicking "add test" or "edit test";
  //if we arrive here by clicking "add" a new test, props.new will be true (see app.jsx, routes).
  //if we arrive by clicking "edit" an existing test, props.new will be false.
  //use isNew to conditionally render things! 

  //are we pushing to master?
  const isNew = props.new; 

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{width: '100%', typography: 'body1'}}> 
    {/* { isNew 
    ? <p>I'm new!</p>
    : <p>I'm not new :/</p>
    } */}
    <TabContext value={value} centered textColor="secondary" indicatorColor="secondary">
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <TabList onChange={handleChange} centered>
          <Tab label="Test Settings" value="1" /> 
          <Tab label="Test Questions" value="2" /> 
        </TabList>
      </Box>
      <TabPanel value="1">
        <TestSettings isNew={isNew} /> 
      </TabPanel>
      <TabPanel value="2">
        < QuestionList /> 
      </TabPanel>
    </TabContext>
    </Box>
  );
}

export default TestPage;

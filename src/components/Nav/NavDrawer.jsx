import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {makeStyles} from '@material-ui/core'; 
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import '../Nav/Nav.css'; 
import KyrosLogo3 from "../../images/KyrosLogo3.png"; 
import { useSelector } from 'react-redux';

import {
    Drawer, 
    ListItem,
    List,  
    ListItemIcon, 
    ListItemText,
    Typography 
} from '@material-ui/core'; 

//MUI Icons
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240

const useStyles = makeStyles({
    page: {
        background: 'primary', 
        width: '100%'
    },
    list: {
        width: drawerWidth,
        backgroundColor: '#1E2A49',
    },
    fullList: {
        width: 'auto', 
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#1E2A49',
    },
    root: {
        display: 'flex'
    },
    
})
        

export default function NavDrawer({children}) {

const classes= useStyles() 
const history= useHistory();

const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
});

const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }

    setState({ ...state, [anchor]: open });
};

const user = useSelector((store) => store.user);

const proctorMenuItems = [
{
        text: 'User Management',
        icon: <AdminPanelSettingsOutlinedIcon color="secondary"/>, 
        path: '/user_management', 
 },
{
    text: 'Create and View Tests',
    icon: <FeedOutlinedIcon color="secondary"/> ,
    path: '/tests-all', 
},
{
    text: 'Grade Exams',
    icon: <GradingOutlinedIcon color="secondary"/> , 
    path: '//proctor-exam-complete', 
},
{
    text: 'Events',
    icon: <EventOutlinedIcon color="secondary"/> , 
    path: '/events-all', 
},
{
    text: 'Validation',
    icon: <HowToRegOutlinedIcon color="secondary"/> , 
    path: '/compare', 
},

]

const studentMenuItems = [
    {
        text: 'My Credientials',
        icon: <MilitaryTechOutlinedIcon color="secondary" /> , 
        path: '/', 
    },
    {
        text: 'Transcripts',
        icon: <FeedOutlinedIcon color="secondary" />, 
        path: '/tests', 
    },
    {
        text: 'To be Completed',
        icon: <EventOutlinedIcon color="secondary" />, 
        path: '/exams', 
    }
]



// list when proctor is logged in 
const proctorList = (anchor) => (

    <div className={classes.root}> 
    <Drawer
    className={classes.drawer}
    variant="permanent"
    anchor="left"
    classes={{ paper: classes.drawerPaper}}
    >
    
        <div className={(classes.list, {
            [classes.fullList]: anchor === "top" || anchor === "bottom",
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}>
    
        <Link to="/home">
        <img src={KyrosLogo3} alt="logo" className="logo" /> 
        </Link>
        </div>
<List>
    {proctorMenuItems.map(item => (
        <ListItem
        button
        key={item.text}
        onClick={()=> history.push(item.path)}
        >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} className="listItemText"/> 
        </ListItem>
        ))}
</List>
  
</Drawer>
</div> 
);

// List for when student is logged in 
const studentList = (anchor) => (

    <div className={classes.root}> 
    <Drawer
    className={classes.drawer}
    variant="permanent"
    anchor="left"
    classes={{ paper: classes.drawerPaper}}
    >
    
        <div className={(classes.list, {
            [classes.fullList]: anchor === "top" || anchor === "bottom",
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}>
    
        <Link to="/home">
        <img src={KyrosLogo3} alt="logo" className="logo" /> 
        </Link>
        </div>
<List>
    {studentMenuItems.map(item => (
        <ListItem
        button
        key={item.text}
        onClick={()=> history.push(item.path)}
        >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} className="listItemText"/> 
        </ListItem>
        ))}
</List>
  
</Drawer>
</div> 
); 

  return (
      <div className="nav">
     
     {/* if no user is logged in show these links */}
    {user.id === null &&
    <Link className="navLink" to="/login">
        Login/Register
    </Link>
    }
    
    {/* if user is logged in as a proctor */}
    <div> 
    {user.role === "PROCTOR" && (
          <Button onClick={toggleDrawer('left', true)}><MenuIcon style={{color: 'white'}} /></Button>
            )}
    {user.role === "PROCTOR" && (
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
              {proctorList('left')}
          </Drawer>
    )} 
         </div> 
         


     <div className='nav-hamburger'>
    {user.role === "STUDENT" && ( 
    <Button onClick={toggleDrawer('left', true)}><MenuIcon style={{color: 'white'}} /></Button>
    )}
    {user.role === "STUDENT" && (
    <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
    {studentList('left')}
    </Drawer>
    )}
    </div>
     
    
     </div>      
    ); 
}; 


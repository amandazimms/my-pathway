import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {makeStyles} from '@material-ui/core'; 
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import '../Nav/Nav.css'; 
import KyrosLogo3 from "../../images/KyrosLogo3.png"; 
import { useSelector } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import LongLogo from "../../images/LongLogo.png"; 

import {
    Drawer, 
    ListItem,
    List,  
    ListItemIcon, 
    ListItemText,
    Typography ,
    Divider
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
        

export default function ProctorNavDrawer({children}) {

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
    text: 'Events',
    icon: <EventOutlinedIcon color="secondary"/> , 
    path: '/events-all', 
},
{
    text: 'Tests',
    icon: <FeedOutlinedIcon color="secondary"/> ,
    path: '/tests-all', 
},
{
    text: 'Users',
    icon: <AdminPanelSettingsOutlinedIcon color="secondary"/>, 
    path: '/user_management', 
 },
 {
    text: 'Profile',
    icon: <EventOutlinedIcon color="secondary" />, 
    path: '/user', 
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
    
        <Link to="/">
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
<Divider/> 
<List> 
<ListItem> <LogOutButton/></ListItem>
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
            <Button 
                onClick={toggleDrawer('left', true)}
            >
                <img src={LongLogo} alt="logo" className="logo" />
            </Button>
            )}
    {user.role === "PROCTOR" && (
            <Drawer 
                anchor={'left'} 
                open={state['left']} 
                onClose={toggleDrawer('left', false)}
            >
              {proctorList('left')}
          </Drawer>
    )} 
         </div>
    
     </div>      
    ); 
}; 
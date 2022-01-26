import React from "react"; 
import { withRouter } from "react-router";

//Drawer MUI 
import {Drawer as MUIDrawer, 
                  ListItem, 
                  List,  
                  ListItemText, 
                  ListItemIcon,
                  AppBar,
                  Toolbar,
                  Typography,
                  Box, 
                  Button } from "@material-ui/core"; 

import {makeStyles} from "@material-ui/core/styles"; 
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { CssBaseline } from "@mui/material";


const useStyles = makeStyles({
  drawerWidth: {
    width: '400px', 
    color: 'primary'
  }
}); 

const NavDrawer = (props) => {
console.log(props);

const {history} = props;  
const classes = useStyles(); 
const itemsList = [
  {
      text:"Create Test", 
      icon: <BookmarkAddOutlinedIcon/>, 
      onClick: ()=> history.push('/test')
  }, 
  {
      text:"Messages",
      icon: <ChatBubbleOutlineOutlinedIcon/>, 
      onClick: ()=> history.push('/chat')
  },
  {
      text:"About",
      icon: <ListAltOutlinedIcon/>,
      onClick: ()=> history.push('/about')
  },
  {
      text:"Info",
      icon: <InfoOutlinedIcon/>,
      onClick: ()=> history.push('/info')
  },
  ]; 


 return(
   <Box sx={{display: 'flex'}}>
     <CssBaseline/> 
    <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer +1}}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div"></Typography>
      </Toolbar>
    </AppBar>
  <MUIDrawer variant="permanent" className={classes.drawer}>
  <List>
            {itemsList.map((item, index) => {
              const {text, icon, onClick} = item; 

  return (
              
              <ListItem button key={text} onClick={onClick}>
                { icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
          );
        })}
          </List>
  </MUIDrawer>
  </Box>
 );
};
  
export default withRouter(NavDrawer);


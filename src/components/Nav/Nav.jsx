import React from "react"; 
import { withRouter } from "react-router";
//Drawer MUI 
import {Drawer as MUIDrawer, ListItem, List,  ListItemText, ListItemIcon} from "@material-ui/core"; 
import {makeStyles} from "@material-ui/core/styles"; 
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';


const useStyles = makeStyles({
  drawer: {
    width: '200px' 

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

  );
};
export default withRouter(NavDrawer);


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { useSelector, useDispatch } from 'react-redux';
import {makeStyles} from '@material-ui/core'; 

const useStyles = makeStyles({
    appBar: {
        backgroundColor: '#D3D3D3', 
        width: '95%',
        position: "static", 
        justifyContent: "space-between", 
        color: "#1E2A49", 
    },
    
})

export default function ExamAppBar() {
    const store = useSelector((store) => store);
    const test = useSelector(store => store.test.selected);
    const exam = useSelector(store => store.exam.selected);
    const classes= useStyles() 

    const fetchMyExam = () => {
        dispatch({ type: "FETCH_SELECTED_EXAM", payload: { exam_id: exam.exam_id } });
    }

    const abortExam = () => {
        if (confirm('Are you sure you want to abort this exam? It cannot be undone, and you cannot return to the exam later. If you are unsure, please contact your proctor before proceeding.')) {
            dispatch({
                type: 'END_EXAM',
                payload: {
                    exam_id: store.exam.selected.exam_id,
                    done: () => {
                        history.push('/home')
                    }
                }
            })
        }
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <FeedOutlinedIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Exam: {store.exam.selected.test_title}
          </Typography>
          <Button className="abortButton" variant="contained" color="error" onClick={abortExam}>End My Exam</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
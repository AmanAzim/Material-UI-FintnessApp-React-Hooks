import React,{useContext, useEffect} from 'react';
import {
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    makeStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColor from '@material-ui/icons/BorderColor';
import {FitnessContext} from '../../contex';
import ReusableForm from '../dialogs/ReusableForm';


const style={
    Paper:{padding:20, marginTop:10, marginBottom:10, height:500, overflowY:'auto', marginLeft:0}
};

const useEditFormStyles=makeStyles(theme=>({
    fab: {
        margin:2,
    },
    formControl:{
        minWidth: 500,
    }
}));


const Exercises =(props)=>{

    const EditFormClasses = useEditFormStyles();

    const context=useContext(FitnessContext);
    const {selectedMuscle, exercises, selectedExercise, editExercise, exerciseToEdit:{title, description, muscle}}=context;

    useEffect(()=>{

    }, [exercises, selectedMuscle]);


    return (
        <Grid container>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <Paper style={style.Paper}>
                    {selectedMuscle.map(muscle=>{
                        return(
                            <React.Fragment key={muscle}>
                                <Typography variant="h5" style={{textTransform:'capitalize', display:'flex'}}>
                                    {muscle}
                                </Typography>
                                <List component="ul">
                                 {exercises.map((exercise,index)=>{
                                    if(exercise.muscle===muscle){
                                        return (
                                            <ListItem button key={exercise.id} onClick={()=>context.onSelectExerciseHandler(exercise.id)}>
                                                <ListItemText primary={exercise.title} />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="Delete" onClick={()=>context.onEditExercise(exercise.id)}>
                                                        <BorderColor />
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="Delete" onClick={()=>context.deleteExerciseFromList(exercise.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            );
                                        }
                                      })
                                    }
                                </List>
                            </React.Fragment>
                        );
                      })
                    }
                </Paper>
            </Grid>
            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                {editExercise? <ReusableForm editExercise
                                             classes={EditFormClasses}
                                             addedExercise={{muscles, title, description, muscle}}
                                             onTitleTextFieldHandler={context.addExerciseTitle}
                                             onMuscleNativeSelectHandler={context.addExerciseMuscle}
                                             onDcpTitleTextFieldHandler={context.addExerciseDescription}
                                             onButtonHandler={validateAndAddExercise}/> :
                    <React.Fragment>
                     <Paper style={style.Paper}>
                        <Typography variant="h4" style={{marginTop:'20px'}}>
                            {selectedExercise? selectedExercise.title:'Welcome'}
                        </Typography>
                        <Typography variant="body1">
                            {selectedExercise? '':'Please select exercise from the list on the left'}{selectedExercise? selectedExercise.description:''}
                        </Typography>
                     </Paper>
                   </React.Fragment>}
            </Grid>
        </Grid>
    );
};

export default Exercises;

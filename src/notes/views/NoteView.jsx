import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { DeleteOutline, SaveOutlined } from '@mui/icons-material'
import { setActiveNote, startDeletingNote, startSavingNote } from '../../store/notes'
import { useForm } from '../../hooks'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

    const {active: note, messageSaved, isSaving} = useSelector(state => state.notes);
    const { title, body, date, onInputChange, formState} = useForm(note);
    const dispatch = useDispatch();

    //Transform date in readable string
    const dateString = useMemo(() => {
        const newDate = new Date(date).toDateString();
        return newDate;
    }, [date])

    //Set new active note when state change
    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    //Display alert when messageSaved change
    useEffect(() => {
      if (messageSaved.length > 0) {
        Swal.fire('Updated Note', messageSaved, 'success');
      }
    }, [messageSaved])

    //Save and delete note
    const onSaveNote = () => dispatch(startSavingNote());
    const onDelete = () => dispatch(startDeletingNote());

    return (
        <Grid container direction='row' alignSelf='center' justifyContent='space-between' sx={{mb: 1}} className='animate__animated animate__fadeIn animate__faster'>
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{dateString}</Typography>
            </Grid>

            <Grid item>
                <Button disabled={isSaving} onClick={onSaveNote} color='primary' sx={{padding: 2}}>
                    <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                    Save
                </Button>
            </Grid>

            <Grid container>
                <TextField type='text' variant='filled' fullWidth placeholder='Type a title 📝' label='Title' sx={{border: 'none', mb: 1}} name='title' value={title} onChange={onInputChange} />
                <TextField type='text' variant='filled' fullWidth placeholder='Wassup? 😁' label='Description' minRows={5} multiline name='body' value={body} onChange={onInputChange}/>
            </Grid>

            <Grid container justifyContent='end'>
                <Button onClick={onDelete} sx={{mt:2}} color='error'>
                    <DeleteOutline />
                    Delete
                </Button>
            </Grid>
        </Grid>
    )
}
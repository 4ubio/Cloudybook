import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'
import { NotesLayout } from '../layout/NotesLayout'
import { NothingSelectedView, NoteView } from '../views'
import { startNewNote } from '../../store/notes'

export const NotesPage = () => {

    const {isSaving, active} = useSelector(state => state.notes)
    const dispatch = useDispatch();
    const onClickNewNote = () => dispatch(startNewNote());

    return (
        <>  
            <NotesLayout>

                { !!active 
                    ? <NoteView/>
                    : <NothingSelectedView/>
                }

                <IconButton 
                    onClick={onClickNewNote}
                    disabled={isSaving}
                    size='large' 
                    sx={{
                        color: 'white', 
                        backgroundColor: 'error.main', 
                        ':hover': {backgroundColor: 'error.main', opacity: 0.9},
                        position: 'fixed',
                        right: 50,
                        bottom: 50
                    }}>
                        <AddOutlined sx={{fontSize: 30}} />
                </IconButton>
            </NotesLayout>
        </>
    )
}
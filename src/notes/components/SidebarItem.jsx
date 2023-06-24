import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { setActiveNote } from '../../store/notes'

export const SidebarItem = ({id, date, title, body}) => {

    //Cut large titles
    const newTitle = useMemo(() => {
        return title.length > 17 ? title.substring(0,17) + '...' : title;
    }, [title])

    //Cut large body
    const newBody = useMemo(() => {
        return body.length > 50 ? body.substring(0,50) + '...' : body;
    }, [body])

    const dispatch = useDispatch();

    const onClickItem = () => {
        const activeNote = {id, date, title, body}
        dispatch(setActiveNote(activeNote))
    }

    return (
        <ListItem disablePadding onClick={onClickItem}>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot/>
                </ListItemIcon>

                <Grid container display='block'>
                    <ListItemText primary={newTitle}/>
                    <ListItemText secondary={newBody}/>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}

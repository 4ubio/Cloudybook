import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Divider, Drawer, Grid, IconButton, List, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { SidebarItem } from './SidebarItem';
import { useWindowSize } from '../../hooks/';

export const Sidebar = ({drawerWidth = 240, toggle, setToggle}) => {
    const {displayName, photoURL} = useSelector(state => state.auth);
    const {notes} = useSelector(state => state.notes);
    const [width] = useWindowSize();

    useEffect(() => {
      if (width >= 900) setToggle(true);
      if (width < 900) setToggle(false);         //Hide and unhide sidebar only in small screens
    }, [width])

    const onToggle = () => setToggle(!toggle);
    
    const onToggleNote = () => {
        if (width < 900) setToggle(!toggle);     //Hide sidebar when click on note only in small screens
    }

    return (
        <Box
            component='nav'
            sx={{width: {md: drawerWidth}, flexShrink: {md: 0}}}
        >
            <Drawer
                open={toggle}
                variant='persistent'
                sx={{ 
                    display: {xs: 'block'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
                }}>
                <Toolbar>
                    <Grid container direction='row' justifyContent='space-around' alignItems='center' textAlign='center' mt={1} mb={1}>
                        <Grid container direction='row' width='20%'>
                            <img src={photoURL} alt="photo" className='profile-pic'/>
                        </Grid>

                        <Typography variant='h6' component='div'>{displayName}</Typography>

                        <IconButton edge='end' sx={{display: {md: 'none'}}} onClick={onToggle}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Toolbar>

                <Divider />

                <List onClick={onToggleNote}>
                    {notes.map(note => ( <SidebarItem key={note.id} {...note}/> ))}
                </List>

            </Drawer>
        </Box>
    )
}
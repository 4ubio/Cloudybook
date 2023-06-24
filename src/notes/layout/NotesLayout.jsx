import React, { useState } from 'react'
import { Box, Toolbar } from '@mui/material'
import { Navbar, Sidebar } from '../components';

const drawerWidth = 240;

export const NotesLayout = ({children}) => {
    const [toggle, setToggle] = useState(false);
    
    return (
        <Box sx={{display: 'flex'}} className='animate__animated animate__fadeIn animate__faster'>
            <Navbar drawerWidth={drawerWidth} toggle={toggle} setToggle={setToggle}/>
            <Sidebar drawerWidth={drawerWidth} toggle={toggle} setToggle={setToggle}/>
            
            <Box component='main' sx={{flexGrow: 1, padding: 3}}>
                <Toolbar></Toolbar>
                {children}
            </Box>
        </Box>
    )
}
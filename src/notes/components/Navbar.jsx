import React from 'react'
import { useDispatch } from 'react-redux'
import { AppBar, IconButton, Toolbar, Typography, Grid } from '@mui/material'
import { Instagram, LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { startLogout } from '../../store/auth/'

export const Navbar = ({drawerWidth = 240, toggle, setToggle}) => {
    const dispatch = useDispatch();
    const onLogout = () => dispatch(startLogout()); 
    const onToggle = () => setToggle(!toggle);

    return (
        <AppBar 
            position='fixed' 
            sx={{ 
                width: { md: `calc(100% - ${ drawerWidth }px)` },
                ml: { md: `${ drawerWidth }px` }
            }}
        >
            <Toolbar>
                <IconButton 
                    color='inherit' 
                    edge='start' 
                    sx={{mr: 2, display: {md: 'none'}}} 
                    onClick={onToggle}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography noWrap variant='h6' component='div'>☁️ Cloudybook</Typography>

                    <Grid item>
                        <IconButton sx={{color: 'white', mr: 1}} onClick={() => window.open('https://www.instagram.com/4ubio/')}>
                            <Instagram/>
                        </IconButton>
                        
                        <IconButton color='error' onClick={onLogout}>
                            <LogoutOutlined />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
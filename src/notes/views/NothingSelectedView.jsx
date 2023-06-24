import React from 'react'
import { Grid, Typography } from '@mui/material'
import CloudDoneIcon from '@mui/icons-material/CloudDone';

export const NothingSelectedView = () => {
    return (
        <Grid 
            className='animate__animated animate__fadeIn animate__faster'
            container 
            spacing={0} 
            direction="column"
            alignItems="center" 
            justifyContent="center"
            sx={{minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 3}}
        >
            <Grid item xs={12}>
                <CloudDoneIcon sx={{fontSize: 100, color: 'white'}} />
            </Grid>

            <Grid item xs={12}>
                <Typography color='white' variant='h5'>Select or create a new note</Typography>
            </Grid>
        </Grid>
    )
}
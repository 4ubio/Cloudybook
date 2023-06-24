import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from "react-router-dom";
import { Grid, TextField, Button, Typography, Link, Alert } from '@mui/material'
import { Google } from '@mui/icons-material'
import { AuthLayout } from "../layout/AuthLayout";
import { startCreatingUserWithEmailPassword, startGoogleSignIn } from '../../store/auth/';
import { useForm } from "../../hooks/";

//Initial form state
const formData = { displayName: '', email: '', password: ''}

//Validations
const formValidations = {
    displayName: [(value) => value.length >= 1, 'Name is obligatory'],
    email: [(value) => value.includes('@'), 'Email need to have @'],
    password: [(value) => value.length >= 6, 'Password need to have more than 6 characters']
}

export const RegisterPage = () => {

    //Prevent error messages when page is reloaded
    const [formSubmitted, setFormSubmitted] = useState(false);

    const {
        formState, displayName, email, password, onInputChange, 
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations)

    const {status, errorMessage} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const isCheckingAuth = useMemo(() => status === 'checking', [status]);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        if(!isFormValid) return;
        dispatch(startCreatingUserWithEmailPassword(formState))
    }

    const onGoogleSignIn = () => dispatch(startGoogleSignIn())

    return (
        <AuthLayout title="Register">
            <form action="" onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
                <Grid container>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label="Name" 
                            type='text' 
                            placeholder='John Doe' 
                            fullWidth
                            name="displayName"    
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={(!isFormValid && formSubmitted) ? displayNameValid : ''}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label="Email" 
                            type='email' 
                            placeholder='email@gmail.com' 
                            fullWidth
                            name="email"    
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid  && formSubmitted}
                            helperText={(!isFormValid && formSubmitted) ? emailValid : ''}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label="Password" 
                            type='password' 
                            placeholder='*****' 
                            fullWidth
                            name="password"    
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={(!isFormValid && formSubmitted) ? passwordValid : ''}
                        />
                    </Grid>

                    <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                        <Alert severity='error'>{errorMessage}</Alert>
                    </Grid>

                    <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                        <Grid item xs={12} sm={6}> 
                            <Button disabled={isCheckingAuth} variant='contained' fullWidth type="submit">
                                Create account
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}> 
                            <Button disabled={isCheckingAuth} variant='contained' fullWidth onClick={onGoogleSignIn}>
                                <Google />
                                <Typography sx={{ml: 1}}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Link component={RouterLink} color='inherit' to='/auth/login'>
                            Already have an account?
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
}
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { NotesRoutes } from '../notes/routes/NotesRoutes'
import { CheckingAuth } from '../UI/'
import { useCheckAuth } from '../hooks/'

export const AppRouter = () => {

    const status = useCheckAuth();
    if (status === 'checking') return <CheckingAuth/>
    
    return (
        <Routes>
            {
                (status === 'authenticated')
                ? <Route path='/*' element={<NotesRoutes/>}/>
                : <Route path='/auth/*' element={<AuthRoutes/>}/>
            }
            <Route path='/*' element={<Navigate to='/auth/login' />} />
        </Routes>
    )
}

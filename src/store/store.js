import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { notesSlice } from './notes'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        notes: notesSlice.reducer
    },
})
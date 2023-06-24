import React from 'react'
import { AppTheme } from './theme/AppTheme'
import { AppRouter } from './router/AppRouter'

export const CloudybookApp = () => {
    return (
        <AppTheme>
            <AppRouter />
        </AppTheme>
    )
}
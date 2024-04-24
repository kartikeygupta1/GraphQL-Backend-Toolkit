'use client';
import { AppProvider } from '@/context/AppContext'
import { GraphProvider } from '@/context/GraphContext';
import React from 'react'

const Template = ({ children }) => {
    return (
        <AppProvider>
            <GraphProvider>
                {children}
            </GraphProvider>
        </AppProvider>
    )
}

export default Template
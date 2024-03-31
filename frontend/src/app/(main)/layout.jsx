import React from 'react'
import Navbar from './navbar';


const Main = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default Main;
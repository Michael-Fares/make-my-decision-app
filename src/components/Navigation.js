import React from 'react'
import { AppBar, Toolbar, 
    Typography } from '@mui/material'

import { Link } from 'react-router-dom'

import { checkAuth } from '../Router'


const Navigation = () => {
    return checkAuth() ? (
        // show if logged in
        <AppBar position="relative">
            <Toolbar className="navbar">
                <Typography variant="h5" style={{ flexGrow: "1" }}>
                    <i>Make My Decision</i>
                </Typography>
                <ul className="nav-list">
                    <li className="nav-list-item">
                        <Link to="/decisions">My Saved Decisions</Link>
                    </li>
                    <li className="nav-list-item">
                        <Link to="/">About</Link>
                    </li>
                    <li className="nav-list-item"
                    onClick={()=>{
                        document.cookie = "loggedIn="
                        window.location.replace('/login')
                        localStorage.clear()
                    }}>
                        Logout
                    </li>
                </ul>
            </Toolbar>
        </AppBar>
    ) : (
        // show if not logged in
        <AppBar position="relative">
            <Toolbar className="navbar">
                <Typography variant="h5" style={{ flexGrow: "1" }}>
                    <i>Make My Decision</i>
                </Typography>
                <ul className="nav-list">
                    <li className="nav-list-item">
                        <Link to="/login">Login/Sign Up</Link>
                    </li>
                    <li className="nav-list-item">
                        <Link to="/">About</Link>
                    </li>
                </ul>
            </Toolbar>
        </AppBar>

    )
}

export default Navigation

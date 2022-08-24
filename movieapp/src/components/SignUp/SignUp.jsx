import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { Outlet, Link } from 'react-router-dom';


const SignUp = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const inputStyles = {
        margin: '1rem 0rem',
        padding: '1rem',
        borderRadius: '25px',
        fontSize: '16px',
        width:'100%'
    }

    const handleSignup = (event) => {
        event.preventDefault()
        if (firstName != '' && lastName != '' && username != '' && password != ''){
            props.handleSignup(firstName, lastName, username, password)
        }
    }

    return (
        <Grid container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', maxWidth: '400px', margin: 'auto' }}>
            <h1 style={{ margin: '2rem 0rem' }}>Sign Up</h1>
            <form>
                <input name="firstname" value={firstName} placeholder='First Name' style={inputStyles} type="text" autoComplete='off' onChange={event => (setFirstName(event.target.value))} required/>
                <input name="lastname" value={lastName} placeholder='Last Name' style={inputStyles} type="text" autoComplete='off' onChange={event => (setLastName(event.target.value))} required />
                <input name="username" value={username} placeholder='Username' style={inputStyles} type="text" autoComplete='off' onChange={event => (setUsername(event.target.value))} required />
                <input name="password" value={password} placeholder='Password' style={inputStyles} type="password" autoComplete='off' onChange={event => (setPassword(event.target.value))} required />
                <button className="loginBtn" style={{ margin: 'auto' }} onClick={event => handleSignup(event)}>Sign Up</button>
            </form>
            <Link style={{ margin: '2rem 0'}} to="/login">Already have an account? Sign in.</Link>
        </Grid>
    )
}

export default SignUp
import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom';

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

    const inputStyles = {
        margin:'1.5rem 0rem',
        padding:'1rem',
        borderRadius: '25px',
        fontSize: '16px',
        width: '100%'
    }

    const handleLogin = (event) => {
      event.preventDefault()
      props.handleLogin(username, password)
    }

    return (<>
      {!props.auth ? 
      <Grid container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', maxWidth: '400px', margin: 'auto' }}>
        <h1 style={{ margin: '3rem 0rem' }}>Login to React Movies</h1>
        <form>
          <input name="username" value={username} placeholder='Username' onChange={event => (setUsername(event.target.value))} style={inputStyles} type="text" autoComplete='off' required />
          <input name="password" value={password} placeholder='Password' style={inputStyles} type="password" autoComplete='off' onChange={event => (setPassword(event.target.value))} required />
            <button className="loginBtn" style={{ margin: 'auto' }} onClick={handleLogin}>Login</button>
        </form>
        <Link style={{ margin: '2rem 0' }} to="/signup">Don't have an account? Sign up.</Link>
      </Grid> 
      : 
      <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', maxWidth: '400px', margin: 'auto' }} container>
        <h1 style={{margin:'2rem'}}>Hello {props.username}!</h1>
        <Link style={{color:'green'}} to="/">Head to Homepage.</Link>
      </Grid>}
    </>
    )
}

export default Login
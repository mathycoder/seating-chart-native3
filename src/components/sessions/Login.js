import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/currentUserActions.js'

const Login = ({ login, history }) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const submitHandler = () => {
    const data = {
      email: email,
      password: password
    }
    login(data, history)
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-form">
        <div className="flexseats-title">
          Login
        </div>
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => submitHandler()}
          className="myButton">Log In
        </button>
      </div>
    </div>
  )
}

function mapDispatchToProps(dispatch){
  return {
    login: (credentials, history) => dispatch(login(credentials, history))
  }
}

export default connect(null, mapDispatchToProps)(Login)

import React, {useState} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect, useHistory} from 'react-router-dom'

const Login = () => {
  const [userID, setUserID] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const history = useHistory()
  const onChangeUserId = e => {
    setUserID(e.target.value)
  }

  const onChangePin = e => {
    setPassword(e.target.value)
  }

  const loginSuccess = async jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.push('/')
  }

  const loginRequest = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/ebank/login'
    const userData = {user_id: userID, pin: password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      loginSuccess(data.jwt_token)
    } else {
      setErrMessage(data.error_msg)
      setLoginError(true)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="first">
      <div className="second">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
          alt="website login"
        />

        <form onSubmit={loginRequest} className="Second">
          <h1>Welcome Back!</h1>
          <label htmlFor="ID">User ID</label>
          <input
            id="ID"
            type="text"
            value={userID}
            placeholder="Enter User ID"
            onChange={onChangeUserId}
          />

          <label htmlFor="PIN">PIN</label>
          <input
            id="PIN"
            type="password"
            value={password}
            placeholder="Enter PIN"
            onChange={onChangePin}
          />

          <button type="submit">Login</button>
          {loginError ? <p>{errMessage}</p> : null}
        </form>
      </div>
    </div>
  )
}

export default Login

import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookie from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookie.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()

    const {userId, pin} = this.state

    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const userDetails = {user_id: userId, pin}
    const options = {method: 'POST', body: JSON.stringify(userDetails)}

    const response = await fetch(apiUrl, options)
    console.log(response)

    const data = await response.json()
    console.log(data)

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserInput = event => {
    this.setState({userId: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({pin: event.target.value})
  }

  render() {
    const {errorMsg, userId, pin} = this.state

    const jwtToken = Cookie.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card-container">
          <div className="website-login-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="website-login-image"
            />
          </div>
          <form
            type="form"
            className="form-container"
            onSubmit={this.onSubmitLoginForm}
          >
            <h1 className="greeting-heading">Welcome Back!</h1>
            <div className="input-container">
              <label htmlFor="user-input" className="label-element">
                USER ID
              </label>
              <input
                type="text"
                id="user-input"
                placeholder="Enter User ID"
                className="input-element"
                onChange={this.onChangeUserInput}
                value={userId}
              />
            </div>
            <div className="input-container">
              <label htmlFor="pin" className="label-element">
                PIN
              </label>
              <input
                type="password"
                id="pin"
                placeholder="Enter PIN"
                className="input-element"
                onChange={this.onChangePasswordInput}
                value={pin}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <p className="error-msg">{errorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login

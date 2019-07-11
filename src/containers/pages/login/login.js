import React, { Component } from 'react';
import ReactNotification from "react-notifications-component";

import Input from '../../../components/input';
import Button from '../../../components/button';
import { login } from '../../../services/login-service';
import history from '../../app/history';

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      formControls: {
        email: '',
        password: ''
      },
      errors: {}
    }

    this.notificationDOMRef = React.createRef();
  }

  addNotification(title, message, type) {
    this.notificationDOMRef.current.addNotification({
      title,
      message,
      type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  validate = (control, value) => {

    const errors = {};

    if (control === 'email') {
      errors.email = value.trim() ? '' : 'Email Required'
    }

    if (control === 'password') {
      errors.password = value.trim() ? '' : 'Password Required'
    }
    return errors
  }

  onBlur = (event) => {
    const { name } = event.target;
    const currentControl = this.state.formControls
    let errors = this.validate(name, currentControl[name])
    const existingErrors = this.state.errors
    errors = Object.assign(existingErrors, errors)
    this.setState({
      errors
    });
  }

  onChange = (event) => {
    const { name, value } = event.target;
    const currentControl = this.state.formControls
    currentControl[name] = value.trim()
    let errors = this.validate(name, value)
    const existingErrors = this.state.errors
    errors = Object.assign(existingErrors, errors)
    this.setState({
      formControls: currentControl,
      errors
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const values = Object.values(this.state.formControls)
    const isValid = values.every(value => {
      const val = value.trim();
      return (val !== '' && val !== null)
    })

    if (isValid) {
      login(this.state.formControls)
        .then(res => {
          if (res.token) {
            history.push('/home')
          }
        })
        .catch((error) => {
          this.addNotification('Error', error, 'danger')
        })
    }
  }

  render() {
    return (
      <div className="login-bg">
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="login-container">
          <div className="login-sidebar--img"></div>
          <div className="login-sidebar--form">
            <h1>Account Login</h1>
            <form onSubmit={this.handleSubmit}>
              <Input
                type="text"
                placeholder="User Name"
                name="email"
                error={this.state.errors.email}
                autoComplete="off"
                blur={this.onBlur}
                change={this.onChange}
              />

              <Input
                type="password"
                placeholder="Password"
                name="password"
                error={this.state.errors.password}
                autoComplete="off"
                blur={this.onBlur}
                change={this.onChange}
              />
              <div className="button-container">
                <Button>Login</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
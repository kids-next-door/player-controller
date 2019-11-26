import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './index.css'
let { login, loginAnonymously } = require('../../util/firebaseAuth')

export class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', redirectTo: null};   
    }
    
    errorText

    handleUsernameChange = (event) => {
        this.setState({username: event.target.value.toLowerCase()})
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        login(this.state.username, this.state.password).then((value) => {
            this.setState({redirectTo: '/join'})
        }).catch((err) => {
            this.errorText = err.message
        })
    }

    handleGuestLogin = () => {
        loginAnonymously().then((value) => {
            this.setState({redirectTo: '/join'})
        }).catch((err) => {
            this.errorText = err.message
        })
    }

    render() {
        if(this.state.redirectTo && this.props.authState){
            const { redirectTo } = this.state
            return <Redirect to={redirectTo} />
        } 

        return (
            <div className='Login'>
                <div className='errorContainer'>
                    <p>{this.errorText}</p>
                </div>
                
                <div className='loginFieldContainer'>
                    <label><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" onChange={this.handleUsernameChange} value={this.state.username} required/>
                </div>
                
                <div className='loginFieldContainer'>
                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" onChange={this.handlePasswordChange} value={this.state.password} required/>
                </div>
                
                <div className='loginButtonsContainer'>
                    <button type='submit' onClick={this.handleSubmit}>Login</button>
                    <button type='button' onClick={this.handleGuestLogin}>Guest</button>
                </div>
            </div>
        )
    }
}

export default Login

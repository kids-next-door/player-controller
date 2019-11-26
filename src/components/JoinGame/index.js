import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './index.css'

let { joinRoom } = require('../../util/firebaseAuth')
// import { joinRoom } from '../../util/firebaseAuth'

export class JoinGame extends Component {
    constructor(props) {
        super(props);
        this.state = {displayName: '', roomCode: '', redirectTo: null};   
    
    }

    handleDisplayNameChange = (event) => {
        this.setState({displayName: event.target.value})
    }

    handleRoomCodeChange = (event) => {
        this.setState({roomCode: event.target.value.toUpperCase()})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        joinRoom(this.props.authState, this.state.displayName, this.state.roomCode)
        this.setState({redirectTo: '/game/' + this.state.roomCode})
    }

    render() {
        if (!this.props.authState) {
            return <Redirect to='/login' />
        }

        if(this.state.redirectTo && this.props.authState){
            return <Redirect to={this.state.redirectTo}/>
        }

        return (
            <div className='Login'>
                <div className='loginFieldContainer'>
                    <label><b>Display Name</b></label>
                    <input type="text" placeholder="Enter Display Name" name="displayName" onChange={this.handleDisplayNameChange} value={this.state.displayName} required/>
                </div>
                
                <div className='loginFieldContainer'>
                    <label><b>4-Digit Room Code</b></label>
                    <input type="text" placeholder="Enter Room Code" name="roomCode" onChange={this.handleRoomCodeChange} value={this.state.roomCode} required/>
                </div>
                
                <div className='buttonsContainer'>
                    <button type='submit' onClick={this.handleSubmit}>Join</button>
                </div>
            </div>
        )
    }
}

export default JoinGame

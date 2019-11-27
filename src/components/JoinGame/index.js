import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './index.css'

const firebase = require('../../util/config-firebase')
const joinRoom = (authState, displayName, roomCode) => {firebase.database().ref('games').orderByChild('code').equalTo(roomCode).on("value", (snapshot) => {
    let id
    if (snapshot && snapshot.val()) {
        snapshot.forEach(function (data) {
            id = data.key
        })

        firebase.database().ref('games/' + id + '/connected_players/' + authState.uid).set({ name: displayName })
        return id
    }
})}

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
                
                <div className='loginButtonsContainer'>
                    <button type='submit' onClick={this.handleSubmit}>Join</button>
                </div>
            </div>
        )
    }
}

export default JoinGame

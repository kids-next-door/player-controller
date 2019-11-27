import React, { Component } from 'react'
import './index.css'

const firebase = require('../../util/config-firebase')
const sendMove = (authState, roomCode, requestedMove) => {
    firebase.database().ref('games').orderByChild('code').equalTo(roomCode).limitToFirst(1).once('value', data => {
        const gameId = Object.keys(data.val())[0]
        if (data.val()[gameId].player_state && data.val()[gameId].player_state[authState.uid] && data.val()[gameId].player_state[authState.uid].current_position) {
            const state = data.val()[gameId].player_state[authState.uid]
            requestedMove.x += state.current_position.x
            requestedMove.y += state.current_position.y
        }

        firebase.database().ref('games/' + gameId + '/player_state/' + authState.uid + '/requested_position').set(requestedMove)
    })
}
// Gamepad is just the actual I/O d-pad in the center of the player controller screen
// Arrow color: #F3AB0A

export class Gamepad extends Component {
    roomCode;

    componentWillMount() {
        const path = this.props.location.pathname
        console.log(path)
        this.roomCode = path.substring(path.length - 4, path.length)
    }
    

    sendMove = (element = null) => {
        const {authState} = this.props
        let requestedMove = {}
        requestedMove.x = element.x
        requestedMove.y = element.y*-1
        sendMove(authState, this.roomCode, requestedMove)
    }

    arrows = [
        {angle: -135, direction: 'upLeft', x: -1, y: 1},
        {angle: -90, direction: 'up', x: 0, y: 1},
        {angle: -45, direction: 'upRight', x: 1, y: 1},
        {angle: -180, direction: 'left', x: -1, y: 0},
        {angle: undefined, direction: undefined},
        {angle: 0, direction: 'right', x: 1, y: 0},
        {angle: -225, direction: 'downLeft', x: -1, y: -1},
        {angle: -270, direction: 'down', x: 0, y: -1},
        {angle: -315, direction: 'downRight', x: 1, y: -1},

    ]

    render() {
        const arrowElems = this.arrows.map( (element, i) => {
           return (<div key={i} className='directionButton' onTouchStart="" onClick={element.direction !== undefined ? () => {this.sendMove(element)} : null}>
                {element.angle !== undefined ? <img src='/arrow-right-solid.svg' alt='d-pad button' style={{transform: `rotate(${element.angle}deg)`}}/> : null}
            </div>)
        });
        return (<div className='gamepadWrapper'>
            <h2>Room Code: {this.roomCode}</h2>
            
            <div className='Gamepad'>
                {arrowElems}
            </div>
        </div>
        )
    }

   

    // number => [0, 1, 2, ... number]
    // These methods 
    range = (count) => {
        return Array.from(Array(count).keys());
    }
        
    degreesToRadians = (angleInDegrees) => {
        return Math.PI * angleInDegrees / 180;
    }

    points = (count, radius, offset = 0) => {
        const angle = 360 / count;
        const vertexIndices = this.range(count);
      
        return vertexIndices.map(index => {
          return {
            theta: offset + this.degreesToRadians(offset + angle * index),
            r: radius,
          };
        });
    }

    polarToCartesian = (r, theta) => {
        return ({
            x: r * Math.cos(theta),
            y: r * Math.sin(theta)
        })
    }
}

export default Gamepad

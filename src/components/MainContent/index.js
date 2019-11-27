import React, { Component } from 'react'
import Gamepad from '../Gamepad'
import './index.css'
import Login from '../Login'
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import JoinGame from '../JoinGame';


class MainContent extends Component {
    render() {
        const {authState} = this.props

        return (
                <div className='MainContent'>
                <Switch>
                    <Route path='/login'>
                        <Login authState={authState}/>
                    </Route>

                    <Route path='/game/:id' render={(props) => <Gamepad { ...{...props, ...this.props} }/>} />

                    <Route path='/'>
                        <JoinGame authState={authState}/>
                    </Route>
                </Switch>
                </div>            
        )
    }
}

export default withRouter(MainContent)

const firebase = require('./config-firebase')

/*
	registerStateListener
		handler: user => { }
*/

module.exports = {
	createUser: async (email, password) => await firebase.auth().createUserWithEmailAndPassword(email, password),
	login: async (email, password) => await firebase.auth().signInWithEmailAndPassword(email, password),
	loginAnonymously: () => firebase.auth().signInAnonymously(),
    logout: async () => await firebase.auth().signOut(),
    joinRoom: (authState, displayName, roomCode) => {firebase.database().ref('games').orderByChild('code').equalTo(roomCode).on("value", (snapshot) => {
        let id
        if(snapshot && snapshot.val()){
            snapshot.forEach(function(data) {
                id = data.key
            })

            firebase.database().ref('games/' + id + '/connected_players/' + authState.uid).set({name: displayName})
            return id
        }
    })},
    sendMove: (authState, roomCode, requestedMove) => {firebase.database().ref('games').orderByChild('code').equalTo(roomCode).on("value", (snapshot) => {
        let id
        if(snapshot && snapshot.val()){
            snapshot.forEach(function(data) {
                id = data.key
            })

            firebase.database().ref('games/' + id + '/player_state/' + authState.uid + '/current_position/').once('value').then(value => {
                console.log(value)
            })
            return id
            /* 
                TODO: Send move request to appropriate spot; unsure if I should be creating entries, or if we should have host do that 

                authState -> whole authState object
                roomCode -> 4-digit room code
                requested move -> requested move in the form of the amount to add to the x and y position. for instance, {x: 1, y: -1}
            */
        }
    })},
        
	registerStateListener: async handler => firebase.auth().onAuthStateChanged(handler),
}
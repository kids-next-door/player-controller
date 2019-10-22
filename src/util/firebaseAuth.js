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
    sendMove: (authState, roomCode, requestedMove) => {
        firebase.database().ref('games').orderByChild('code').equalTo(roomCode).limitToFirst(1).once('value', data => {
            const gameId = Object.keys(data.val())[0]
            if(data.val()[gameId].player_state && data.val()[gameId].player_state[authState.uid] && data.val()[gameId].player_state[authState.uid].current_position){
                const state = data.val()[gameId].player_state[authState.uid]

                requestedMove.x += state.current_position.x
                requestedMove.y += state.current_position.y
            }

            firebase.database().ref('games/' + gameId + '/player_state/' + authState.uid + '/requested_position').set(requestedMove)
        })
    },
        
	registerStateListener: async handler => firebase.auth().onAuthStateChanged(handler),
}
const firebase = require('firebase/app')
require('firebase/firestore')
const firebaseConfig = require('./firebaseConfig')

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const logout = () => {
  firebase.auth().signOut()
}

module.exports = {
  logout,
  firebase,
}

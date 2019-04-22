import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCTsWi9viZqHYqhxGPPyL0J4NqTyC9xg_s',
  authDomain: 'cowfeederpro.firebaseapp.com',
  databaseURL: 'https://cowfeederpro.firebaseio.com',
  projectId: 'cowfeederpro',
  storageBucket: 'cowfeederpro.appspot.com',
  messagingSenderId: '720145628247'
}

firebase.initializeApp(config)

const db = firebase.firestore()

export default db

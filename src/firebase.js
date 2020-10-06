import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB707dXRqfFrBjbyQaVelqFZMpbAqmGpYA",
  authDomain: "karetnikova-practice1-20c78.firebaseapp.com",
  databaseURL: "https://karetnikova-practice1-20c78.firebaseio.com",
  projectId: "karetnikova-practice1-20c78",
  storageBucket: "karetnikova-practice1-20c78.appspot.com",
  messagingSenderId: "46131008394",
  appId: "1:46131008394:web:1bc4a789f92e5ec3082e73"
};
  
  firebase.initializeApp(config);

  export default firebase;
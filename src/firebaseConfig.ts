import firebase from "firebase"
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyCjiBLzgUJtlDSHb7W3yCtlnfWruf5-nuc",
  authDomain: "training-diary-6e77f.firebaseapp.com",
  databaseURL: "https://training-diary-6e77f.firebaseio.com",
  projectId: "training-diary-6e77f",
  storageBucket: "training-diary-6e77f.appspot.com",
  messagingSenderId: "497806181198",
  appId: "1:497806181198:web:cf380f8461b161a8f6141f",
  measurementId: "G-PT3RXR0WWD"
};

firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()

const usersCollection = db.collection('users')
const goalsCollection = db.collection('goals')
const annualGoalsCollection = db.collection('annual-goals')

export {
  db,
  auth,
  usersCollection,
  goalsCollection,
  annualGoalsCollection
}


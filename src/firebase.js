import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyC-_wcp808vMZfaPfnFceu6iLZkOOPp23I",
  authDomain: "jeng-b720f.firebaseapp.com",
  databaseURL: "https://jeng-b720f.firebaseio.com",
  projectId: "jeng-b720f",
  storageBucket: "jeng-b720f.appspot.com",
  messagingSenderId: "999587528936",
  appId: "1:999587528936:web:e94bc871aeaa671ff6895d"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}

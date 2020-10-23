import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyCkg5qeUfMqLGZhPHuc-aASvWk_HNQnZGo",
  authDomain: "jeng-7a656.firebaseapp.com",
  databaseURL: "https://jeng-7a656.firebaseio.com",
  projectId: "jeng-7a656",
  storageBucket: "jeng-7a656.appspot.com",
  messagingSenderId: "868343478822",
  appId: "1:868343478822:web:4f551d3f3d5a4003b384e7"
}
firebase.initializeApp(firebaseConfig)
firebase.firestore().enablePersistence()

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  storage,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}

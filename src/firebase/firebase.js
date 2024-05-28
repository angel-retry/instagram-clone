// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAfB_zSeVAqQZKd1eVIijoerPF01XuYy1E',
  authDomain: 'instagram-clone-228b2.firebaseapp.com',
  projectId: 'instagram-clone-228b2',
  storageBucket: 'instagram-clone-228b2.appspot.com',
  messagingSenderId: '452871036159',
  appId: '1:452871036159:web:d662d73ff64efbfe8f40ca',
  measurementId: 'G-18J37N333V'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, auth, firestore, storage }

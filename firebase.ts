// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_RESX27Io_P5WfwzUAGP_EyNKpA_Cy48",
  authDomain: "netflix-clone-90811.firebaseapp.com",
  projectId: "netflix-clone-90811",
  storageBucket: "netflix-clone-90811.appspot.com",
  messagingSenderId: "730700654740",
  appId: "1:730700654740:web:6f65a352559906286d2c81",
  measurementId: "G-Z97LX0VLQ5"
};

// Initialize Firebase
const app = !getApps().length? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);
const db = getFirestore()
const auth = getAuth()

export default app
export {auth,db}
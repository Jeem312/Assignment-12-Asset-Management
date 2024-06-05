// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0k4jrhUcdS5FHUY6K6lTR7tTxKujQjqk",
  authDomain: "assignment-12-f1692.firebaseapp.com",
  projectId: "assignment-12-f1692",
  storageBucket: "assignment-12-f1692.appspot.com",
  messagingSenderId: "896747495285",
  appId: "1:896747495285:web:30b61035b5a83c48fc3d3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
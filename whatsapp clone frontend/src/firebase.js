import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCP1voNZP9--ySXfuVQaw4PkaOKu6EE5mw",
  authDomain: "whatsapp-mern-by-hanan.firebaseapp.com",
  projectId: "whatsapp-mern-by-hanan",
  storageBucket: "whatsapp-mern-by-hanan.appspot.com",
  messagingSenderId: "949377149726",
  appId: "1:949377149726:web:8c81c18da4a9b211d0f70f",
  measurementId: "G-BZ3MJ4JCBT",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
//const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
//export default db;

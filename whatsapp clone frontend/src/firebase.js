import firebase from "firebase";
const firebaseConfig = {
  apiKey: "process.env.API",
  authDomain: "process.env.AUTH_DOMAIN",
  projectId: "process.env.PROJECT_ID",
  storageBucket: "process.env.STORAGE_BUKET",
  messagingSenderId: "process.env.SENDER_ID",
  appId: "process.env.APP_ID",
  measurementId: "MEASUREMENTID",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
//const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
//export default db;

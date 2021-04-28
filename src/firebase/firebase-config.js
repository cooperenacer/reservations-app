import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAMMAzbDJfiDZ6hLxKxHG41MTdsqIxqNhM",
    authDomain: "cooperenacer-reservas.firebaseapp.com",
    databaseURL: "https://cooperenacer-reservas-default-rtdb.firebaseio.com",
    projectId: "cooperenacer-reservas",
    storageBucket: "cooperenacer-reservas.appspot.com",
    messagingSenderId: "458304167676",
    appId: "1:458304167676:web:8f79e8f95aeb7a66748179",
    measurementId: "G-VGKBY13WG2"
}

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export {
    db,
    firebase
}
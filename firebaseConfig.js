import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDkagGNSRnvH3WKDOBiM19oBZuq7BYoE8c",
  authDomain: "crud-b6823.firebaseapp.com",
  databaseURL: "https://crud-b6823-default-rtdb.firebaseio.com", // Importante para Realtime
  projectId: "crud-b6823",
  storageBucket: "crud-b6823.firebasestorage.app",
  messagingSenderId: "358597552738",
  appId: "1:358597552738:web:22e9fd9c8507230e687f3b",
  measurementId: "G-GTJB07QCFV"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC-Y1_PI99Zo5puMb9Q5CkOtNkO18bBdro",
  authDomain: "tarefas-plus-6090a.firebaseapp.com",
  projectId: "tarefas-plus-6090a",
  storageBucket: "tarefas-plus-6090a.firebasestorage.app",
  messagingSenderId: "410835351154",
  appId: "1:410835351154:web:b1b8daa1e58d2c5ba4b4eb"
};

const FirebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(FirebaseApp);

export { db }
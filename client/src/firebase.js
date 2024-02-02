// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mernauth-b9556.firebaseapp.com",
    projectId: "mernauth-b9556",
    storageBucket: "mernauth-b9556.appspot.com",
    messagingSenderId: "15360201747",
    appId: "1:15360201747:web:c5fb65002ed2030b9fdbe6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
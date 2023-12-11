
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQWYTMSlsb0cqa9HPgWFKNkyBcXanOsMY",
  authDomain: "react-netflix-clone-4c895.firebaseapp.com",
  projectId: "react-netflix-clone-4c895",
  storageBucket: "react-netflix-clone-4c895.appspot.com",
  messagingSenderId: "791611993855",
  appId: "1:791611993855:web:bb405fcc7688d2a37b66ca",
  measurementId: "G-LH1QF5LP5W"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth =getAuth(app);
// firebase/firebaseAuth.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

// Function to login user with Firebase Authentication
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

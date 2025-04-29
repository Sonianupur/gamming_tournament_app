import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./firebase";

// Function to log in a user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Returns the logged-in user
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};
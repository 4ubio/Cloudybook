import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const {uid, displayName, email, photoURL} = result.user;
        return {
            ok: true,
            uid, displayName, email, photoURL
        }
    } catch (error) {
        return {ok: false, errorMessage: error.message}
    }
}

export const loginWithEmailPassword = async({email, password}) => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, displayName, photoURL } = result.user;
        return {
            ok: true,
            uid, displayName, email, photoURL
        }
    } catch (error) {
        return {ok: false, errorMessage: error.message}
    }
}

export const registerWithEmailPassword = async({displayName, email, password}) => {
    try {
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const {uid, photoURL} = result.user;
        await updateProfile(FirebaseAuth.currentUser, {displayName});
        return {
            ok: true,
            uid, displayName, email, photoURL
        }
    } catch (error) {
        return {ok: false, errorMessage: error.message}
    }
}

export const logOutFirebase = async() => {
    return await FirebaseAuth.signOut();
}
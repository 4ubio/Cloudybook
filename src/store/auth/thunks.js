import { logOutFirebase, loginWithEmailPassword, registerWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"
import { clearNotesLogout } from "../notes/";

export const checkingAuthentication = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result))
        dispatch(login(result))
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const result = await loginWithEmailPassword({email, password});
        if (!result.ok) return dispatch(logout(result));
        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({displayName, email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const result = await registerWithEmailPassword({displayName, email, password});
        if (!result.ok) return dispatch(logout(result))
        dispatch(login(result))
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logOutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout());
    }
}
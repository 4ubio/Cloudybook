import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from "./notesSlice";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async(dispatch, getState) => {
        dispatch(savingNewNote())

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const {uid} = getState().auth;                      //Get current user ID
        const url = `${uid}/user_notes/notes`;              //Set personal path per user
        const newDoc = doc(collection(FirebaseDB, url))     
        await setDoc(newDoc, newNote);                      //Insert new note
        newNote.id = newDoc.id;                             //Set ID to new note
        dispatch(addNewEmptyNote(newNote));                 
        dispatch(setActiveNote(newNote))
    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        if (!uid) throw new Error('UID not found')
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))
    }
}

export const startSavingNote = () => {
    return async(dispatch, getState) => {
        dispatch(setSaving());
        const {uid} = getState().auth;                          //Get current user ID
        const {active:note} = getState().notes;                 //Get active note ID
        const noteToFirestore = {...note};                      
        delete noteToFirestore.id;
        const url = `${uid}/user_notes/notes/${note.id}`;
        const docRef = doc(FirebaseDB, url);
        await setDoc(docRef, noteToFirestore, {merge: true});   //Update note
        dispatch(updateNote(note));
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        const {active:note} = getState().notes;
        const url = `${uid}/user_notes/notes/${note.id}`;
        const docRef = doc(FirebaseDB, url);
        await deleteDoc(docRef);
        dispatch(deleteNoteById(note.id));
    }
}
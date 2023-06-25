import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firebaseConfig } from 'core/constants';

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default firebase;

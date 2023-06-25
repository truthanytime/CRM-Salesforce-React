import { CollectionReference, DocumentData } from '@firebase/firestore-types';
import { firestoreBasePath } from 'core/constants';
import { db } from './firebase';

const getFirestoreRef = (path: string): CollectionReference<DocumentData> => {
  return db.collection(`${firestoreBasePath}/${path}`);
};

export default getFirestoreRef;

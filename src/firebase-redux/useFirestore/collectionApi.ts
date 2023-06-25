import { DocumentData, Query, QueryDocumentSnapshot } from '@firebase/firestore-types';
import { MutableRefObject } from 'react';
import { CollectionOptions } from '../queryOptions';
import { GenericActions } from '../generic';
import { ListenerState } from './index';

type AnyFunc = (...args: any[]) => any;
const collectionApi = <T>(
  query: Query,
  actions: GenericActions<T>,
  dispatch: AnyFunc,
  collectionListenersRef: MutableRefObject<ListenerState[]>,
  lastDocRef: MutableRefObject<QueryDocumentSnapshot<DocumentData> | undefined>,
  options?: CollectionOptions,
) => {
  dispatch(actions.setLoading(true));
  if (options && options?.listen) {
    const listener = query.onSnapshot(
      (querySnapshot) => {
        const data: DocumentData[] = [];
        if (querySnapshot.empty) {
          dispatch(actions?.setSuccess([] as unknown as T));
          return;
        }
        querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
        dispatch(actions?.setSuccess(data as unknown as T));
        if (options.lazyLoad) {
          lastDocRef.current = querySnapshot.docs[querySnapshot.docs.length - 1];
        }
      },
      (error) => {
        dispatch(actions?.setError(true));
        console.log('collection streaming error', error.message);
      },
    );
    collectionListenersRef.current.push({ name: options.listenerName, unsubscribe: listener });
  } else {
    query
      .get()
      .then((querySnapshot) => {
        const data: T[] = [];
        querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as unknown as T));
        dispatch(actions?.setSuccess(data as unknown as T));
        if (options && options.lazyLoad) {
          lastDocRef.current = querySnapshot.docs[querySnapshot.docs.length - 1];
        }
      })
      .catch((error) => {
        console.log('collection get error', error.message);
        dispatch(actions?.setError(error.message));
      });
  }
};

export default collectionApi;

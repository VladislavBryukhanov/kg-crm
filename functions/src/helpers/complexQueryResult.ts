import { Query, QuerySnapshot, QueryDocumentSnapshot, DocumentReference } from "@google-cloud/firestore";

export async function complexQueryResult<T>(queries: Promise<QuerySnapshot>[]): Promise<T[]> {
  const querySnapshots = await Promise.all(queries);

  const documentSnapshots = querySnapshots.reduce(
    (result: Array<QueryDocumentSnapshot>, snapshot) => [ ...result, ...snapshot.docs ],
    []
  );

  const resultData: T[] = [];

  documentSnapshots.forEach((docSnapshot: QueryDocumentSnapshot) => {
    resultData.push(docSnapshot.data() as T);
  });

  return resultData;
}

export async function queryResultRefs(query: Query): Promise<DocumentReference[]> {
  const querySnapshot = await query.get();
  const resultData: DocumentReference[] = [];

  querySnapshot.forEach((docSnapshot: QueryDocumentSnapshot) => {
    resultData.push(docSnapshot.ref);
  });

  return resultData;
}

export async function queryGetOne<T extends { id: string }>(query: Query): Promise<T | undefined> {
  let result: T;

  const querySnapshot = await query.limit(1).get();
  if (querySnapshot.empty) return;

  querySnapshot.forEach((snapshot) => result = { 
    id: snapshot.id,
    ...snapshot.data(),
  } as T);

  return result!;
}
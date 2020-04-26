import firebase from 'firebase';
import { uuid } from 'uuidv4';

const storageRef = firebase.storage().ref();
const PERSON_AVATAR_DIR = 'person_avatar';

export class FileRepo {
  static getPersonAvatarUrl(imageId: string): Promise<string> {
    const path = storageRef.child(PERSON_AVATAR_DIR).child(imageId).fullPath;
    return storageRef.child(path).getDownloadURL();
  }

  static uploadPersonAvatar(file: File): Promise<string> {
    const imageId = uuid();
    return storageRef.child(PERSON_AVATAR_DIR).child(imageId).put(file)
      .then(snapshot => snapshot.ref.name);
  }

  static deletePersonAvatar(imageId: string): Promise<void> {
    return storageRef.child(PERSON_AVATAR_DIR).child(imageId).delete();
  }
}
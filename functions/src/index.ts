import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

const PERSON_COLLECTION = 'persons';
const PERSON_AVATAR_DIR = 'person_avatar';

exports.personAvatarCascadeDelete = functions.firestore
  .document(`${PERSON_COLLECTION}/{personId}`)
  .onDelete((snap) => {
    const { avatarFileId } = snap.data()!;
    
    if (avatarFileId) {
      const storage = admin.storage().bucket();
      return storage.file(`${PERSON_AVATAR_DIR}/${avatarFileId}`).delete();
    }
  });

exports.personRemoveOldAvatar = functions.firestore
  .document(`${PERSON_COLLECTION}/{personId}`)
  .onUpdate((change) => {
    const { avatarFileId: previousAvatarFileId } = change.before.data()!;
    const { avatarFileId } = change.after.data()!;
    
    if (avatarFileId !== previousAvatarFileId) {
      const storage = admin.storage().bucket();
      return storage.file(`${PERSON_AVATAR_DIR}/${previousAvatarFileId}`).delete();
    }
  });

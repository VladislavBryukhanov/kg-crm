import firebase from 'firebase';

const sendVacationEmail = firebase.functions().httpsCallable('sendVacationEmail');

export default class MailerApi {
  static sendVacationEmail(startDate: Date, endDate: Date): Promise<firebase.functions.HttpsCallableResult> {
    return sendVacationEmail({ startDate, endDate });
  }
}
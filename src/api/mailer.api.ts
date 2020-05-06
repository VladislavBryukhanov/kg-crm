import firebase from 'firebase';

const vacationScheduling = firebase.functions().httpsCallable('vacationScheduling');

export default class MailerApi {
  static vacationScheduling(startDate: Date, endDate: Date): Promise<firebase.functions.HttpsCallableResult> {
    return vacationScheduling({ startDate, endDate });
  }
}
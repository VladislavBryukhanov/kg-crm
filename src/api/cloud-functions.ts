import firebase from 'firebase';
import { Person } from '@/models/person';
import { personToJsonMutate } from '@/helpers/person-to-json';

export default class CloudFunctionsApi {
  private static cloudFunction(functionName: string) {
    return firebase.functions().httpsCallable(functionName);
  }

  static vacationScheduling(startDate: Date, endDate: Date): Promise<firebase.functions.HttpsCallableResult> {
    const vacationScheduling = this.cloudFunction('vacationScheduling');
    return vacationScheduling({ startDate, endDate });
  }

  static personalProfileUpdate(updates: Partial<Person>) {
    const personalProfileUpdate = this.cloudFunction('personalProfileUpdate');
    personToJsonMutate(updates);
    
    return personalProfileUpdate(updates);
  }
}
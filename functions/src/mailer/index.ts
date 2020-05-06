import { credentials } from './mailer.credentials';
import { vacation } from './constants';
import { Person, ScheduleVacation } from '../models/person';
import * as nodemailer from 'nodemailer';
import * as moment from 'moment-mini';
import * as Mail from 'nodemailer/lib/mailer';

class Mailer {
  private transporter!: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: credentials.USER_EMAIL,
        clientId: credentials.CLIENT_ID,
        clientSecret: credentials.CLIENT_SECRET,
        refreshToken: credentials.REFRESH_TOKEN,
        accessToken: credentials.ACCESS_TOKEN,
      }
    });
  }
  
  public sendVacationMail(
    person: Person,
    { startDate, endDate }: ScheduleVacation,
    recipientEmails: string[]
  ) {
    const dateFormat = "DD MMMM YYYY";
    const feedbackEmail = person.corporateMail || person.gmail;
    const recipients = recipientEmails.reduce((res: string, email) => `${res}, ${email}`, '');

    return this.transporter.sendMail({
      to: recipients,
      from: `${vacation.SENDER_NAME} <${credentials.USER_EMAIL}>`,
      subject: vacation.SUBJECT,
      text: `
        ${person.fullName} (${feedbackEmail}) planned his vacation in the period from 
        ${moment(startDate).format(dateFormat)} to ${moment(endDate).format(dateFormat)}
      `
    });
  }
}

export default new Mailer();
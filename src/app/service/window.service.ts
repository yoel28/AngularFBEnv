import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {User} from 'firebase';
import {PhoneNumber} from '../PhoneNumber';
import {WindowRecaptcha} from './window-recaptcha';
import {environment} from '../../environments/environment';
import RecaptchaVerifier = firebase.auth.RecaptchaVerifier;
import ConfirmationResult = firebase.auth.ConfirmationResult;

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  private readonly RECAPTCHA = 'recaptcha-container';
  private user: User;

  public constructor() {
    firebase.initializeApp(environment.firebase);
  }


  public get getUser() {
    return this.user;
  }

  private static get getWindow(): WindowRecaptcha {
    return window;
  }

  public static get getConfirmationResult(): ConfirmationResult {
    return WindowService.getWindow.confirmationResult;
  }

  public static get getRecaptchaVerifier(): RecaptchaVerifier {
    return WindowService.getWindow.recaptchaVerifier;
  }

  public static set setRecaptchaVerifier(recaptchaVerifier: RecaptchaVerifier) {
    WindowService.getWindow.recaptchaVerifier = recaptchaVerifier;
  }

  public static set setConfirmationResult(confirmationResult: ConfirmationResult) {
    WindowService.getWindow.confirmationResult = confirmationResult;
  }

  public initRecaptchaVerifier(): void {
    WindowService.setRecaptchaVerifier = new firebase.auth.RecaptchaVerifier(this.RECAPTCHA);
    WindowService.getRecaptchaVerifier.render();
  }

  public sendLoginCode(phoneNumber: PhoneNumber): void {
    firebase.auth().signInWithPhoneNumber(phoneNumber.getE164, WindowService.getRecaptchaVerifier)
      .then(result => WindowService.setConfirmationResult = result)
      .catch( error => console.log(error) );
  }

  public verifyLoginCode(phoneNumber: PhoneNumber) {
    WindowService.getConfirmationResult
      .confirm(phoneNumber.verify)
      .then( result => this.user = result.user)
      .catch( error => console.log(error, 'Incorrect code entered?'));
  }

}

export interface WindowRecaptcha extends Window {
  recaptchaVerifier?: firebase.auth.RecaptchaVerifier;
  confirmationResult?: firebase.auth.ConfirmationResult;
}

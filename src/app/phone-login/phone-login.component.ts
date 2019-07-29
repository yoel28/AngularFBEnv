import {Component, OnInit} from '@angular/core';
import {PhoneNumber} from '../PhoneNumber';
import {WindowService} from '../service/window.service';

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.scss']
})
export class PhoneLoginComponent implements OnInit {

  phoneNumber = new PhoneNumber();

  constructor(private win: WindowService) { }

  ngOnInit() {
    this.win.initRecaptchaVerifier();
  }

  public sendLoginCode(): void {
    this.win.sendLoginCode(this.phoneNumber);
  }

  public verifyLoginCode(): void {
    this.win.verifyLoginCode(this.phoneNumber);
  }

  public get getUser() {
    return this.win.getUser;
  }
  public get getConfirmationResult() {
    return WindowService.getConfirmationResult;
  }


}

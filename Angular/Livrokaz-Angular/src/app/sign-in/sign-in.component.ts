import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Users } from '../Model/users';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  connectForm: FormGroup;

  constructor(private location: Location,
              private formBuilder: FormBuilder,
              private loginService: LoginService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.connectForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(255)])
      ]
    });
  }

  onConnect() {
    const user = new Users(null,
                          this.connectForm.value.username,
                          this.connectForm.value.password,
                          1,
                          'INSCRIT');
    this.loginService.signIn(user);
  }

  onBack() {
    this.location.back();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientsService } from '../services/clients.service';
import { Location } from '@angular/common';
import { Users } from '../Model/users';
import { Client } from '../Model/client';
import { MatSnackBar } from '@angular/material';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  inscriptionForm: FormGroup;

  constructor(private clientsService: ClientsService,
              private formBuilder: FormBuilder,
              private location: Location,
              private snackBar: MatSnackBar,
              private loginService: LoginService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.inscriptionForm = this.formBuilder.group({
      nomClient: [null, Validators.required],
      prenomClient: [null, Validators.required],
      emailClient: [null, Validators.required],
      numeroL: [null],
      rueL: [null],
      complementL: [null],
      cpL: [null],
      villeL: [null],
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSave() {
    const formValue = this.inscriptionForm.value;
    const newUser = new Users(
      null,
      formValue['username'],
      formValue['password'],
      1,
      'INSCRIT'
    );
    const newClient = new Client(
      null,
      formValue['nomClient'],
      formValue['prenomClient'],
      +formValue['numeroL'],
      formValue['rueL'],
      formValue['complementL'],
      +formValue['cpL'],
      formValue['villeL'],
      null,
      null,
      null,
      null,
      null,
      formValue['emailClient'],
      newUser
    );
    // vérification du Username unique
    this.clientsService.availableClients$.subscribe(clients => {
      const listUsernameIdentique = clients.filter(client => client.users.username === formValue['username']);
      // Si le Username n'existe pas déjà dans la BDD
      if (listUsernameIdentique.length === 0) {
        this.loginService.signUp(newClient);
      } else {
        // Sinon pop-up erreur
        this.snackBar.open('Cet identifiant existe déjà', 'ERREUR', {
          duration: 2000,
        });
      }
    });
    this.location.back();
  }

  onBack() {
    this.location.back();
  }

}

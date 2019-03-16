import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ClientsService } from '../services/clients.service';
import { Client } from '../Model/client';
import { Users } from '../Model/users';
import { Authorities } from '../Model/authorities';
import { AuthoritiesService } from '../services/authorities.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gestion-detail-client',
  templateUrl: './gestion-detail-client.component.html',
  styleUrls: ['./gestion-detail-client.component.css']
})
export class GestionDetailClientComponent implements OnInit {

  id: number;
  clientForm: FormGroup;
  nomInit = '';
  prenomInit = '';
  emailInit = '';
  numeroLInit = 0;
  rueLInit = '';
  complementLInit = '';
  cpLInit = 0;
  villeLInit = '';
  numeroFInit = 0;
  rueFInit = '';
  complementFInit = '';
  cpFInit = 0;
  villeFInit = '';
  userIdInit = null;
  clientIdInit = null;
  usernameInit = '';
  passwordInit = '';
  enabledInit = 1;
  roleIdInit = null;

  constructor(private clientsService: ClientsService,
              private authoritiesService: AuthoritiesService,
              private location: Location,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    if (this.id) {
      this.getClientById(this.id);
    }
    this.initForm();
  }

  getClientById(id: number) {
    this.clientsService.findClient(id).subscribe(client => {
      this.clientIdInit = client.idClient;
      this.nomInit = client.nomClient;
      this.prenomInit = client.prenomClient;
      this.emailInit = client.emailClient;
      this.numeroLInit = client.numeroL;
      this.rueLInit = client.rueL;
      this.complementLInit = client.complementL;
      this.cpLInit = client.cpL;
      this.villeLInit = client.villeL;
      this.numeroFInit = client.numeroF;
      this.rueFInit = client.rueF;
      this.complementFInit = client.complementF;
      this.cpFInit = client.cpF;
      this.villeFInit = client.villeF;
      this.userIdInit = client.users.idUser;
      this.usernameInit = client.users.username;
      this.passwordInit = client.users.password;
      this.enabledInit = client.users.enabled;
      this.authoritiesService.findAuthorityByUsername(client.users.username).subscribe(auth => {
        this.roleIdInit = auth.idAuth;
      });
    });
  }

  initForm() {
    this.clientForm = this.formBuilder.group({
      nomClient: [this.nomInit, Validators.required],
      prenomClient: [this.prenomInit, Validators.required],
      emailClient: [this.emailInit, Validators.required],
      numeroL: [this.numeroLInit],
      rueL: [this.rueLInit],
      complementL: [this.complementLInit],
      cpL: [this.cpLInit],
      villeL: [this.villeLInit],
      numeroF: [this.numeroFInit],
      rueF: [this.rueFInit],
      complementF: [this.complementFInit],
      cpF: [this.cpFInit],
      villeF: [this.villeFInit],
      idUser: [this.userIdInit],
      username: [this.usernameInit, Validators.required],
      password: [this.passwordInit, Validators.required],
      enabled: [this.enabledInit, Validators.required]
    });
  }

  onSave() {
    const formValue = this.clientForm.value;
    const newUser = new Users(
      this.userIdInit,
      formValue['username'],
      formValue['password'],
      +formValue['enabled'],
      'INSCRIT'
    );
    const newClient = new Client(
      this.clientIdInit,
      formValue['nomClient'],
      formValue['prenomClient'],
      +formValue['numeroL'],
      formValue['rueL'],
      formValue['complementL'],
      +formValue['cpL'],
      formValue['villeL'],
      +formValue['numeroF'],
      formValue['rueF'],
      formValue['complementF'],
      +formValue['cpF'],
      formValue['villeF'],
      formValue['emailClient'],
      newUser
    );
    const newAuth = new Authorities(
      this.roleIdInit,
      'INSCRIT',
      formValue['username']
    );
    // Si on est en mode Edition
    if (this.id) {
      this.clientsService.updateClient(newClient);
      this.authoritiesService.updateAuthority(newAuth);
    // Si on est en mode Création
    } else {
      this.authoritiesService.getAuthorities().subscribe(authorities => {
        const listUsernameIdentique = authorities.filter(authority => authority.username === formValue['username']);
        // Si le Username n'existe pas déjà dans la BDD
        if (listUsernameIdentique.length === 0) {
          this.clientsService.createClient(newClient);
          this.authoritiesService.createAuthority(newAuth);
        } else {
          // Sinon pop-up erreur
          this.snackBar.open('Cet identifiant existe déjà', 'ERREUR', {
            duration: 2000,
          });
        }
      });
    }
    this.location.back();
  }

  onBack() {
    this.location.back();
  }

}

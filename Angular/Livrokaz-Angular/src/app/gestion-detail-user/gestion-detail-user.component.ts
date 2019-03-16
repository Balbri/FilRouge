import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../Model/users';
import { Authorities } from '../Model/authorities';
import { UsersService } from '../services/users.service';
import { AuthoritiesService } from '../services/authorities.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-gestion-detail-user',
  templateUrl: './gestion-detail-user.component.html',
  styleUrls: ['./gestion-detail-user.component.css']
})
export class GestionDetailUserComponent implements OnInit {

  username: string;
  userForm: FormGroup;
  userIdInit = null;
  usernameInit = '';
  passwordInit = '';
  enabledInit = 1;
  roleInit = null;
  roleIdInit = null;
  authorities: Authorities[] = [];
  roles: string[] = [];
  rolesUniques: string[] = [];

  constructor(private usersService: UsersService,
              private authoritiesService: AuthoritiesService,
              private location: Location,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.username = this.route.snapshot.params.username;
    if (this.username) {
      this.getUserByUsername(this.username);
      this.getAuthByUsername(this.username);
    }
    this.initForm();
    this.getAuthorities();
  }

  getUserByUsername(username: string) {
    this.usersService.findUser(username).subscribe(user => {
      this.userIdInit = user.idUser;
      this.usernameInit = user.username;
      this.passwordInit = user.password;
      this.enabledInit = user.enabled;
    });
  }

  getAuthByUsername(username: string) {
    this.authoritiesService.findAuthorityByUsername(username).subscribe(auth => {
      this.roleInit = auth.authority;
      this.roleIdInit = auth.idAuth;
    });
  }

  getAuthorities() {
    function unique(value, index, self) {
        return self.indexOf(value) === index;
      }
    this.authoritiesService.getAuthorities().subscribe(authorities => {
      this.authorities = authorities;
      for (const authority of this.authorities) {
        this.roles.push(authority.authority);
      }
      this.rolesUniques = this.roles.filter(unique);
    });
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      username: [this.usernameInit, Validators.required],
      password: [this.passwordInit, Validators.required],
      enabled: [this.enabledInit, Validators.required],
      authority: [this.roleInit, Validators.required]
    });
  }

  onSave() {
    const formValue = this.userForm.value;
    const newUser = new Users(
      this.userIdInit,
      formValue['username'],
      formValue['password'],
      +formValue['enabled'],
      formValue['authority']
    );
    const newAuth = new Authorities(
      this.roleIdInit,
      formValue['authority'],
      formValue['username']
    );
    // Si on est en mode Edition
    if (this.username) {
      this.usersService.updateUser(newUser);
      this.authoritiesService.updateAuthority(newAuth);
    // Si on est en mode Création
    } else {
      this.authoritiesService.getAuthorities().subscribe(authorities => {
        const listUsernameIdentique = authorities.filter(authority => authority.username === formValue['username']);
        // Si le Username n'existe pas déjà dans la BDD
        if (listUsernameIdentique.length === 0) {
          this.usersService.createUser(newUser);
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

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Users } from '../Model/users';
import { JsonWebToken } from '../Model/jwt.model';
import * as jwt_decode from 'jwt-decode';
import { Client } from '../Model/client';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userRole: BehaviorSubject<string> = new BehaviorSubject('');
  userName: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private httpClient: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    this.getUserRoles();
    this.getUserUsername();
  }

  public get loggedIn(): boolean {
    return sessionStorage.getItem('access_token') !== null;
  }

  signIn(user: Users) {
    this.httpClient.post<JsonWebToken>('http://localhost:8080/api/sign-in', user).subscribe(
      token => {
        sessionStorage.setItem('access_token', token.token);

        this.getUserRoles();
        this.getUserUsername();

        this.router.navigate(['']);

        this.snackBar.open('Bienvenue ' + user.username + ' !', 'CONNEXION', {
          duration: 2000,
        });
      },
      error => {
        console.log('Error while login');
        this.snackBar.open('Impossible de se connecter !', 'ECHEC', {
          duration: 2000,
        });
      });
  }

  signUp(client: Client) {
    this.httpClient.post<JsonWebToken>('http://localhost:8080/api/sign-up', client).subscribe(
      token => {
        sessionStorage.setItem('access_token', token.token);

        this.getUserRoles();
        this.getUserUsername();

        this.router.navigate(['']);

        this.snackBar.open('Vous êtes inscrit !', 'SUCCES', {
          duration: 2000,
        });
      },
      error => {
        console.log('Error while login');
        this.snackBar.open('Inscription impossible !', 'ECHEC', {
          duration: 2000,
        });
      });
  }

  signOut() {
    sessionStorage.removeItem('access_token');
    this.userRole.next('');
    this.userName.next('');
    this.snackBar.open('Vous êtes déconnecté !', 'DECONNEXION', {
      duration: 2000,
    });
  }

  private getUserRoles() {
    if (sessionStorage.getItem('access_token')) {
      const decodedToken = jwt_decode(sessionStorage.getItem('access_token'));
      const authority: string = decodedToken.auth;
      this.userRole.next(authority);
    }
  }

  private getUserUsername() {
    if (sessionStorage.getItem('access_token')) {
      const decodedToken = jwt_decode(sessionStorage.getItem('access_token'));
      const username: string = decodedToken.sub;
      this.userName.next(username);
    }
  }
}

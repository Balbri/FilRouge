import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Users } from '../Model/users';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private availableUsers: Users[];

  availableUsers$: BehaviorSubject<Users[]> = new BehaviorSubject(this.availableUsers);

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  private getUsers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>('http://localhost:8080/api/admin/users');
  }

  public publishUsers() {
    this.getUsers().subscribe(
      usersList => {
        this.availableUsers = usersList;
        this.availableUsers$.next(this.availableUsers);
      }
    );
  }

  /**
   * Cette fonction permet de trouver un user dans la liste des users chargés par l'application
   * grâce à son ID.
   * @param userId l'id qu'il faut rechercher dans la liste.
   */
  public findUser(username: string): Observable<Users> {
    if (username) {
      if (!this.availableUsers) {
        return this.getUsers().pipe(map(users => users.find(user => user.username === username)));
      }
      return of(this.availableUsers.find(user => user.username === username));
    } else {
      return of(new Users(0, '', '', 0, ''));
    }
  }

  /**
   * Fonction de création d'un nouveau user.
   * Elle met à jour notre liste de users et notre liste observable.
   * @param newUsers le nouveau user à créer
   */
  public createUser(newUser: Users) {
    this.httpClient.post<Users>('http://localhost:8080/api/admin/users', newUser).subscribe(
      nouveauUser => {
        this.availableUsers.push(nouveauUser);
        this.availableUsers$.next(this.availableUsers);
      }
    );
  }

  /**
   * Fonction de mise à jour d'un user
   * @param user le user à mettre à jour
   */
  public updateUser(user: Users) {
    this.httpClient.put<Users>('http://localhost:8080/api/admin/users/' + user.idUser, user).subscribe(
      updatedUser => {
        this.availableUsers.splice(this.availableUsers.indexOf(user), 1, updatedUser);
        this.availableUsers$.next(this.availableUsers);
      },
      error => {
        // popu-up erreur
        this.snackBar.open('L\'utilisateur n\'a pas pu être mis à jour', 'ERREUR', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Fonction de suppression d'un user
   * @param id id du user à supprimer
   */
  public deleteUser(idUser: number) {
    this.httpClient.delete<Users>('http://localhost:8080/api/admin/users/' + idUser).subscribe(
      deleteUser => {
        this.availableUsers.splice(this.availableUsers.indexOf(this.availableUsers.find(user => user.idUser === idUser)), 1);
        this.availableUsers$.next(this.availableUsers);
        // pop-up suppression
        this.snackBar.open(deleteUser.username, 'Supprimé', {
          duration: 2000,
        });
      }
    );
  }
}

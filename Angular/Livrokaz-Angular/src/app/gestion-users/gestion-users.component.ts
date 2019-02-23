import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Users } from '../Model/users';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AuthoritiesService } from '../services/authorities.service';

@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.css']
})
export class GestionUsersComponent implements OnInit {

  displayedColumns: string[] = ['select', 'username', 'password', 'authority', 'enabled'];
  dataSource = new MatTableDataSource<Users>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Users>(false, []);

  usersList: BehaviorSubject<Users[]>;

  constructor(private usersService: UsersService,
              private authoritiesService: AuthoritiesService,
              private router: Router) { }

  ngOnInit() {
    setTimeout(() => this.dataSource.sort = this.sort);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.usersList = this.usersService.availableUsers$;
    this.usersList.subscribe(users => {
      this.dataSource = new MatTableDataSource<Users>(users);
    });
  }

  onEdit(selected: Users[]) {
    if (selected.length !== 0) {
      this.router.navigate(['gestion/users/edition/' + selected[0].username]);
    }
  }

  onDelete(selected: Users[]) {
    if (selected.length !== 0) {
      // suppression du User
      this.usersService.deleteUser(selected[0].idUser);
      // suppression du rôle associé
      this.authoritiesService.getAuthorities().subscribe(authorities => {
        const authToDelete = authorities.find(authority => authority.username === selected[0].username);
        this.authoritiesService.deleteAuthority(authToDelete.idAuth);
      });
    }
  }

}

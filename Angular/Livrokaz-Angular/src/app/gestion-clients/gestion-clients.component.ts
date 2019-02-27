import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Client } from '../Model/client';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { ClientsService } from '../services/clients.service';
import { Router } from '@angular/router';
import { AuthoritiesService } from '../services/authorities.service';

@Component({
  selector: 'app-gestion-clients',
  templateUrl: './gestion-clients.component.html',
  styleUrls: ['./gestion-clients.component.css']
})
export class GestionClientsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'nomClient', 'prenomClient', 'username', 'emailClient'];
  dataSource = new MatTableDataSource<Client>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Client>(false, []);

  clientsList: BehaviorSubject<Client[]>;

  constructor(private clientsService: ClientsService,
              private authoritiesService: AuthoritiesService,
              private router: Router) { }

  ngOnInit() {
    setTimeout(() => this.dataSource.sort = this.sort);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.clientsList = this.clientsService.availableClients$;
    this.clientsList.subscribe(clients => {
      this.dataSource = new MatTableDataSource<Client>(clients);
    });
  }

  onEdit(selected: Client[]) {
    if (selected.length !== 0) {
      this.router.navigate(['gestion/clients/edition/' + selected[0].idClient]);
    }
  }

  onDelete(selected: Client[]) {
    if (selected.length !== 0) {
      // suppression du client
      this.clientsService.deleteClient(selected[0].idClient);
      // suppression du rôle associé
      this.authoritiesService.getAuthorities().subscribe(authorities => {
        const authToDelete = authorities.find(authority => authority.username === selected[0].users.username);
        this.authoritiesService.deleteAuthority(authToDelete.idAuth);
      });
      this.selection = new SelectionModel<Client>(false, []);
    }
  }

}

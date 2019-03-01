import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommandesService } from '../services/commandes.service';
import { ClientsService } from '../services/clients.service';
import { Client } from '../Model/client';
import { BehaviorSubject } from 'rxjs';
import { Commande } from '../Model/commande';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gestion-new-commande',
  templateUrl: './gestion-new-commande.component.html',
  styleUrls: ['./gestion-new-commande.component.css']
})
export class GestionNewCommandeComponent implements OnInit {

  commandeForm: FormGroup;
  clientsList: BehaviorSubject<Client[]>;
  clientsInit: null;
  fraisDeport: 0;
  clients:  Client[] = [];


  constructor(private commandesService: CommandesService,
              private clientsService: ClientsService,
              private location: Location,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getClients();
    this.initForm();
  }

  getClients() {
    this.clientsList = this.clientsService.availableClients$;
    this.clientsList.subscribe(clients => this.clients = clients);
  }

  initForm() {
    this.commandeForm = this.formBuilder.group({
      client: [this.clientsInit, Validators.required],
      fraisDePort: [this.fraisDeport, Validators.required]
    });
  }

  onSave() {
    const formValue = this.commandeForm.value;
    const newCommande = new Commande(
      7,
      new Date(),
      formValue['fraisDePort'],
      0,
      0,
      0,
      0,
      0,
      formValue['client'],
      null
    );
    console.log(newCommande);
    this.commandesService.createCommande(newCommande);
    this.location.back();
  }

  onBack() {
    this.location.back();
  }

}

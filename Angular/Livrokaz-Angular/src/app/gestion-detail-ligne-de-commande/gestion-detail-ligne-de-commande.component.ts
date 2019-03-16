import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Livre } from '../Model/livre';
import { LivresService } from '../services/livres.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { LigneDeCommande } from '../Model/lignedeCommande';
import { CommandesService } from '../services/commandes.service';
import { Commande } from '../Model/commande';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../Model/client';
import { LignesDeCommandeService } from '../services/lignes-de-commande.service';

@Component({
  selector: 'app-gestion-detail-ligne-de-commande',
  templateUrl: './gestion-detail-ligne-de-commande.component.html',
  styleUrls: ['./gestion-detail-ligne-de-commande.component.css']
})
export class GestionDetailLigneDeCommandeComponent implements OnInit {

  idCommande: number;
  id: number = null;
  ligneCommandeForm: FormGroup;
  livresList: BehaviorSubject<Livre[]>;
  livres: Livre[] = [];
  livreInit: Livre = null;
  quantiteInit = 1;
  fraisDePort: number;
  client: Client;
  date: Date;

  constructor(private livresService: LivresService,
              private location: Location,
              private commandesService: CommandesService,
              private lignesDeCommandeService: LignesDeCommandeService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.idCommande = +this.route.snapshot.params.idCommande;
    this.id = +this.route.snapshot.params.id;
    if (this.idCommande) {
      this.getCommandeById(this.idCommande);
      this.getLivres();
    }
    if (this.id) {
      this.getLigneCommandeById(this.id);
    }
    this.initForm();
  }

  getCommandeById(id: number) {
    this.commandesService.findCommande(id).subscribe(commande => {
      this.date = commande.date;
      this.client = commande.client;
      this.fraisDePort = commande.fraisDePort;
    });
  }

  getLigneCommandeById(id: number) {
    this.lignesDeCommandeService.findLigneDeCommande(id).subscribe(ldc => {
      this.getCommandeById(ldc.commande.idCommande);
      this.getLivres();
      this.idCommande = ldc.commande.idCommande;
      this.livreInit = this.livres.find(livre => livre.idLivre === ldc.livre.idLivre);
      this.quantiteInit = ldc.quantite;
    });
  }

  getLivres() {
    this.livresList = this.livresService.availableLivres$;
    this.livresList.subscribe(livres => this.livres = livres);
  }

  initForm() {
    this.ligneCommandeForm = this.formBuilder.group({
      livre: [this.livreInit, Validators.required],
      quantite: [this.quantiteInit, Validators.required]
    });
  }

  onSave() {
    const formValue = this.ligneCommandeForm.value;
    const newCommande = new Commande(
      this.idCommande,
      this.date,
      this.fraisDePort,
      0,
      0,
      0,
      0,
      0,
      this.client
    );
    const newLigneCommande = new LigneDeCommande(
      this.id,
      +formValue['quantite'],
      formValue['livre'],
      newCommande
    );
    if (this.id) {
      this.lignesDeCommandeService.updateLigneDeCommande(newLigneCommande);
    } else {
      this.lignesDeCommandeService.createLdc(newLigneCommande);
    }
    this.location.back();
  }

  onBack() {
    this.location.back();
  }

}

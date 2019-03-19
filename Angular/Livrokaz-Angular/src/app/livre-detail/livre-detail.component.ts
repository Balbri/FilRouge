import { Component, OnInit } from '@angular/core';
import { Livre } from '../Model/livre';
import { ActivatedRoute, Router } from '@angular/router';
import { LivresService } from '../services/livres.service';
import { Location } from '@angular/common';
import { LoginService } from '../services/login.service';
import { BehaviorSubject } from 'rxjs';
import { Commande } from '../Model/commande';
import { CommandesService } from '../services/commandes.service';
import { LigneDeCommande } from '../Model/lignedeCommande';
import { LignesDeCommandeService } from '../services/lignes-de-commande.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-livre-detail',
  templateUrl: './livre-detail.component.html',
  styleUrls: ['./livre-detail.component.css']
})
export class LivreDetailComponent implements OnInit {

  id: number;
  titre = '"Détails de "+{{Livre.titreLivre}}';
  displayedLivre: Livre;
  etatStock = 'Moins de 10 articles en stock, dépêchez-vous !';
  commandeClient: Commande;

  commandesList: BehaviorSubject<Commande[]>;
  userName: BehaviorSubject<string>;

  constructor(
    private route: ActivatedRoute,
    private livresService: LivresService,
    private location: Location,
    private loginService: LoginService,
    private router: Router,
    private commandesService: CommandesService,
    private lignesDeCommandeService: LignesDeCommandeService,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    this.getLivreById(this.id);
    this.commandesList = this.commandesService.availableCommandes$;
    this.userName = this.loginService.userName;
    this.getCommandeClient();
  }

  getCommandeClient() {
    this.commandesList.subscribe(commandes => {
      this.commandeClient = commandes.filter(commands => commands.client.users.username === this.userName.value)
                                      .find(commande => commande.valide === 0);
    });
  }

  getLivreById(id: number): void {
    this.livresService.findLivre(id).subscribe(livre => this.displayedLivre = livre);
    if (this.displayedLivre.stock > 10) {
      this.etatStock = 'Disponible';
    }
    this.userName = this.loginService.userName;
  }

  onShop() {
    if (this.loginService.loggedIn) {
      // Si l'utilisateur est connecté l'article vas dans son panier
      if (this.commandeClient !== null) {
        const ldc = new LigneDeCommande(null, 1, this.displayedLivre, this.commandeClient);
        this.lignesDeCommandeService.createLdc(ldc);
      } else {
        this.snackBar.open('Une erreur est survenue !', 'ECHEC', {
          duration: 2000,
        });
      }
    } else {
      // Sinon redirection vers la page de connexion
      this.router.navigate(['signin']);
    }
  }

  onBack() {
    this.location.back();
  }

}

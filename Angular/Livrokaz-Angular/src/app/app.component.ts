import { Component, OnInit } from '@angular/core';
import 'hammerjs';
import { LivresService } from './services/livres.service';
import { LanguesService } from './services/langues.service';
import { GenresService } from './services/genres.service';
import { UsersService } from './services/users.service';
import { AuthoritiesService } from './services/authorities.service';
import { ClientsService } from './services/clients.service';
import { AuteursService} from './services/auteurs.service';
import { EditeursService} from './services/editeurs.service';
import { CommandesService } from './services/commandes.service';
import { LignesDeCommandeService } from './services/lignes-de-commande.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'LivrOkaz';

  constructor(private livresService: LivresService,
              private languesService: LanguesService,
              private genresService: GenresService,
              private usersService: UsersService,
              private authoritiesService: AuthoritiesService,
              private clientsService: ClientsService,
              private auteursService: AuteursService,
              private editeursService: EditeursService,
              private commandesService: CommandesService,
              private lignesDeCommandeService: LignesDeCommandeService
              ) {}

  ngOnInit() {
    this.livresService.publishLivres();
    this.languesService.publishLangues();
    this.genresService.publishGenres();
    this.usersService.publishUsers();
    this.authoritiesService.publishAuthorities();
    this.clientsService.publishClients();
    this.editeursService.publishEditeurs();
    this.auteursService.publishAuteurs();
    this.commandesService.publishCommandes();
    this.lignesDeCommandeService.publishLigneDeCommandes();
  }
}

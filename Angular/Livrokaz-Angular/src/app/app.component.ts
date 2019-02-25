import { Component, OnInit } from '@angular/core';
import 'hammerjs';
import { LivresService } from './services/livres.service';
import { LanguesService } from './services/langues.service';
import { GenresService } from './services/genres.service';
import { UsersService } from './services/users.service';
import { AuthoritiesService } from './services/authorities.service';
import { ClientsService } from './services/clients.service';

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
              private clientsService: ClientsService) {}

  ngOnInit() {
    this.livresService.publishLivres();
    this.languesService.publishLangues();
    this.genresService.publishGenres();
    this.usersService.publishUsers();
    this.authoritiesService.publishAuthorities();
    this.clientsService.publishClients();
  }
}

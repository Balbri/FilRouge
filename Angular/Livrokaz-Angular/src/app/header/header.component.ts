import { Component, OnInit, Input } from '@angular/core';
import { RecherchesService } from '../services/recherches.service';
import { BehaviorSubject } from 'rxjs';
import { Livre } from '../Model/livre';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  searchtext = '';
  isAdmin: boolean;
  username: BehaviorSubject<string>;

  livresList: BehaviorSubject<Livre[]>;
  tableauLivre: Livre[];

  constructor(private rechercheService: RecherchesService,
              private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.userRole.subscribe(userRoles => {
      this.isAdmin = userRoles.includes('ADMIN');
    });
    this.username = this.loginService.userName;
  }

  onSearch() {
    this.searchtext = (<HTMLInputElement>document.getElementById('searchBox')).value.replace(/( )*/gi, '');
    if (this.searchtext.length !== 0) {
      this.rechercheService.publishLivresSearch(this.searchtext);
    this.livresList = this.rechercheService.availableLivres$;
    this.livresList.subscribe(livres => {
      this.tableauLivre = livres;
      this.router.navigate(['recherche/resultat']);
    });
    }
  }

  signOut() {
    this.loginService.signOut();
  }

}

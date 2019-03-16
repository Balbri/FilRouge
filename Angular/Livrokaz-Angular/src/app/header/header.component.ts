import { Component, OnInit, Input } from '@angular/core';
import { RecherchesService } from '../services/recherches.service';
import { BehaviorSubject } from 'rxjs';
import { Livre } from '../Model/livre';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  searchtext = '';

  livresList: BehaviorSubject<Livre[]>;
  tableauLivre: Livre[];

  constructor(private rechercheService: RecherchesService,
              private router: Router) { }

  ngOnInit() {
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

}

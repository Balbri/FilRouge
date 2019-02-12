import { Component, OnInit } from '@angular/core';
import { Livre } from '../Model/livre';
import { ActivatedRoute, Router } from '@angular/router';
import { DatasService } from '../services/datas.service';
@Component({
  selector: 'app-livre-detail',
  templateUrl: './livre-detail.component.html',
  styleUrls: ['./livre-detail.component.css']
})
export class LivreDetailComponent implements OnInit {

  id : number;
  titre = '"Détails de "+{{Livre.titreLivre}}';
  displayedLivre : Livre;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DatasService,
    private location: Location) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.params.id);
    
  }

  getLivreById(id: number): void {
    this.dataService.getLivresById(id).subscribe(livre => this.displayedLivre = livre);
  }

}

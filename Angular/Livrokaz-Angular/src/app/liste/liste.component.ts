import { Component, OnInit } from '@angular/core';
import { DatasService } from '../services/datas.service';
import { BehaviorSubject } from 'rxjs';
import { Livre } from '../Model/livre';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  livresList: BehaviorSubject<Livre[]>;

  constructor(private datasService: DatasService) { }

  ngOnInit() {
    this.livresList = this.datasService.availableLivres$;
    console.log(this.livresList);
  }

}

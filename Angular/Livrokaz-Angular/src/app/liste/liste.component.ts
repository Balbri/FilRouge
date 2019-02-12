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

  livre: Livre;

  livresList: BehaviorSubject<Livre[]>;

  constructor(private datasService: DatasService) { }

  ngOnInit() {
    this.livresList = this.datasService.availableLivres$;
    console.log(this.livresList);
  }

  onSave() {
    this.livre = new Livre(1, 666, 'Germinal', 'https://images-na.ssl-images-amazon.com/images/I/51V6YDH84BL.jpg',
                      'sujet', 'description', 2000,
                      11, 15.59, 21);
    this.datasService.createLivre(this.livre);
  }

  onDelete() {
    const idLivre: number = this.livresList.getValue()[this.livresList.getValue().length - 1].idLivre;
    this.datasService.deleteLivre(idLivre);
  }

  onUpdate() {
    const idLivre: number = this.livresList.getValue()[this.livresList.getValue().length - 1].idLivre;
    this.livre = new Livre(idLivre, 666, 'Toto',
          'https://ec56229aec51f1baff1d-185c3068e22352c56024573e929788ff.ssl.cf1.rackcdn.com/attachments/large/3/8/9/003758389.jpg',
          'sujet', 'description', 2000,
                      8, 10, 21);
    this.datasService.updateLivre(this.livre);
  }

}

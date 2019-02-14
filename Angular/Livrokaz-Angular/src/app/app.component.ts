import { Component, OnInit } from '@angular/core';
import 'hammerjs';
import { LivresService } from './services/livres.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LivrOkaz';

  constructor(private livresService: LivresService) {}

  ngOnInit() {
    this.livresService.publishLivres();
  }
}

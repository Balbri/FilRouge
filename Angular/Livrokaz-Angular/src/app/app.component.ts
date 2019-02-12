import { Component, OnInit } from '@angular/core';
import 'hammerjs';
import { DatasService } from './services/datas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Livr\'ocaz';

  constructor(private datasService: DatasService) {}

  ngOnInit() {
    this.datasService.publishLivres();
  }
}

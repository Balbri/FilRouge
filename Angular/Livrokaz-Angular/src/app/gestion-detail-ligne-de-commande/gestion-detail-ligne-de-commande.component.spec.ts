import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDetailLigneDeCommandeComponent } from './gestion-detail-ligne-de-commande.component';

describe('GestionDetailLigneDeCommandeComponent', () => {
  let component: GestionDetailLigneDeCommandeComponent;
  let fixture: ComponentFixture<GestionDetailLigneDeCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDetailLigneDeCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDetailLigneDeCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

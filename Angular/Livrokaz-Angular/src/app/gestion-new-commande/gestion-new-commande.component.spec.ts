import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNewCommandeComponent } from './gestion-new-commande.component';

describe('GestionNewCommandeComponent', () => {
  let component: GestionNewCommandeComponent;
  let fixture: ComponentFixture<GestionNewCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionNewCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionNewCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDetailCommandeComponent } from './gestion-detail-commande.component';

describe('GestionDetailCommandeComponent', () => {
  let component: GestionDetailCommandeComponent;
  let fixture: ComponentFixture<GestionDetailCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDetailCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDetailCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

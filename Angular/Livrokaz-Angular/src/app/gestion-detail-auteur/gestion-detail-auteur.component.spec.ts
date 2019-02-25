import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDetailAuteurComponent } from './gestion-detail-auteur.component';

describe('GestionDetailAuteurComponent', () => {
  let component: GestionDetailAuteurComponent;
  let fixture: ComponentFixture<GestionDetailAuteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDetailAuteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDetailAuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

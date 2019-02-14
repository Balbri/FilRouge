import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionLanguesComponent } from './gestion-langues.component';

describe('GestionLanguesComponent', () => {
  let component: GestionLanguesComponent;
  let fixture: ComponentFixture<GestionLanguesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionLanguesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionLanguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGenresComponent } from './gestion-genres.component';

describe('GestionGenresComponent', () => {
  let component: GestionGenresComponent;
  let fixture: ComponentFixture<GestionGenresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionGenresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

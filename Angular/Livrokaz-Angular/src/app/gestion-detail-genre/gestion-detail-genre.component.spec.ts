import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDetailGenreComponent } from './gestion-detail-genre.component';

describe('GestionDetailGenreComponent', () => {
  let component: GestionDetailGenreComponent;
  let fixture: ComponentFixture<GestionDetailGenreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDetailGenreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDetailGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

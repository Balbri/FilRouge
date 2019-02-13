import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDetailLivreComponent } from './gestion-detail-livre.component';

describe('GestionDetailLivreComponent', () => {
  let component: GestionDetailLivreComponent;
  let fixture: ComponentFixture<GestionDetailLivreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDetailLivreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDetailLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

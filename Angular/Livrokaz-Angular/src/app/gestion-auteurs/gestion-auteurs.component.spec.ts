import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAuteursComponent } from './gestion-auteurs.component';

describe('GestionAuteursComponent', () => {
  let component: GestionAuteursComponent;
  let fixture: ComponentFixture<GestionAuteursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionAuteursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAuteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

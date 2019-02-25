import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEditeursComponent } from './gestion-editeurs.component';

describe('GestionEditeursComponent', () => {
  let component: GestionEditeursComponent;
  let fixture: ComponentFixture<GestionEditeursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEditeursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEditeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

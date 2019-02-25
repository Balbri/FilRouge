import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDetailEditeurComponent } from './gestion-detail-editeur.component';

describe('GestionDetailEditeurComponent', () => {
  let component: GestionDetailEditeurComponent;
  let fixture: ComponentFixture<GestionDetailEditeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDetailEditeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDetailEditeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

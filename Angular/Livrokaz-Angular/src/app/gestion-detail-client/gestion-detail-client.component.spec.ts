import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDetailClientComponent } from './gestion-detail-client.component';

describe('GestionDetailClientComponent', () => {
  let component: GestionDetailClientComponent;
  let fixture: ComponentFixture<GestionDetailClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDetailClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDetailClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

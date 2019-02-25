import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDetailUserComponent } from './gestion-detail-user.component';

describe('GestionDetailUserComponent', () => {
  let component: GestionDetailUserComponent;
  let fixture: ComponentFixture<GestionDetailUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDetailUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

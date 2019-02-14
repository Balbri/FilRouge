import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDetailLangueComponent } from './gestion-detail-langue.component';

describe('GestionDetailLangueComponent', () => {
  let component: GestionDetailLangueComponent;
  let fixture: ComponentFixture<GestionDetailLangueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDetailLangueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDetailLangueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueFiltreComponent } from './catalogue-filtre.component';

describe('CatalogueFiltreComponent', () => {
  let component: CatalogueFiltreComponent;
  let fixture: ComponentFixture<CatalogueFiltreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogueFiltreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueFiltreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

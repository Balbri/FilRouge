import { TestBed } from '@angular/core/testing';

import { RecherchesService } from './recherches.service';

describe('RecherchesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecherchesService = TestBed.get(RecherchesService);
    expect(service).toBeTruthy();
  });
});

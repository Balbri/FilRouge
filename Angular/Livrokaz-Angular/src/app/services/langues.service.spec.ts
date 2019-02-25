import { TestBed } from '@angular/core/testing';

import { LanguesService } from './langues.service';

describe('Langues.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LanguesService = TestBed.get(LanguesService);
    expect(service).toBeTruthy();
  });
});

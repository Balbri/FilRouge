import { TestBed } from '@angular/core/testing';

import { Langues.ServiceService } from './langues.service.service';

describe('Langues.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Langues.ServiceService = TestBed.get(Langues.ServiceService);
    expect(service).toBeTruthy();
  });
});

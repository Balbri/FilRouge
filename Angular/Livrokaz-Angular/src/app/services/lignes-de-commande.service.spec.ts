import { TestBed } from '@angular/core/testing';

import { LignesDeCommandeService } from './lignes-de-commande.service';

describe('LignesDeCommandeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LignesDeCommandeService = TestBed.get(LignesDeCommandeService);
    expect(service).toBeTruthy();
  });
});

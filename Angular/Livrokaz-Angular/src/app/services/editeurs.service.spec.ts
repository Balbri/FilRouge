import { TestBed } from '@angular/core/testing';

import { EditeursService } from './editeurs.service';

describe('EditeursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditeursService = TestBed.get(EditeursService);
    expect(service).toBeTruthy();
  });
});

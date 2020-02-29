import { TestBed } from '@angular/core/testing';

import { KagetService } from './kaget.service';

describe('KagetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KagetService = TestBed.get(KagetService);
    expect(service).toBeTruthy();
  });
});

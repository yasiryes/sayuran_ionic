import { TestBed } from '@angular/core/testing';

import { BadgerService } from './badger.service';

describe('BadgerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BadgerService = TestBed.get(BadgerService);
    expect(service).toBeTruthy();
  });
});

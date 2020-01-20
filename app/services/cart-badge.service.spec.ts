import { TestBed } from '@angular/core/testing';

import { CartBadgeService } from './cart-badge.service';

describe('CartBadgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartBadgeService = TestBed.get(CartBadgeService);
    expect(service).toBeTruthy();
  });
});

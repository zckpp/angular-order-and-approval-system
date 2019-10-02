import { TestBed } from '@angular/core/testing';

import { CookieAuthService } from './cookie-auth.service';

describe('CookieAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CookieAuthService = TestBed.get(CookieAuthService);
    expect(service).toBeTruthy();
  });
});

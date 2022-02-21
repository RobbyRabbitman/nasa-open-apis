import { TestBed } from '@angular/core/testing';

import { NeoService } from './neo.service';

describe('NeoService', () => {
  let service: NeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

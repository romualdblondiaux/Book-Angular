import { TestBed } from '@angular/core/testing';

import { DvdsService } from './dvds.service';

describe('DvdsService', () => {
  let service: DvdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DvdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

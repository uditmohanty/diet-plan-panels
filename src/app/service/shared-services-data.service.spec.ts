import { TestBed } from '@angular/core/testing';

import { SharedServicesDataService } from './shared-services-data.service';

describe('SharedServicesDataService', () => {
  let service: SharedServicesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServicesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

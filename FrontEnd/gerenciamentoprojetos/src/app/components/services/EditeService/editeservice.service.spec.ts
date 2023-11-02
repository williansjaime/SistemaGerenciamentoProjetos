import { TestBed } from '@angular/core/testing';

import { EditeserviceService } from './editeservice.service';

describe('EditeserviceService', () => {
  let service: EditeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

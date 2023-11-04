import { TestBed } from '@angular/core/testing';

import { RealizartarefaserviceService } from './realizartarefaservice.service';

describe('RealizartarefaserviceService', () => {
  let service: RealizartarefaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealizartarefaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

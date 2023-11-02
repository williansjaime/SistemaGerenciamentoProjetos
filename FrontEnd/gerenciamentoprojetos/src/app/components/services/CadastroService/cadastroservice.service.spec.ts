import { TestBed } from '@angular/core/testing';

import { CadastroserviceService } from './cadastroservice.service';

describe('CadastroserviceService', () => {
  let service: CadastroserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CadastrausuarioService } from './cadastrausuario.service';

describe('CadastrausuarioService', () => {
  let service: CadastrausuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastrausuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

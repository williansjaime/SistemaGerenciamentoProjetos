import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrausuarioComponent } from './cadastrausuario.component';

describe('CadastrausuarioComponent', () => {
  let component: CadastrausuarioComponent;
  let fixture: ComponentFixture<CadastrausuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrausuarioComponent]
    });
    fixture = TestBed.createComponent(CadastrausuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarprojetosComponent } from './cadastrarprojetos.component';

describe('CadastrarprojetosComponent', () => {
  let component: CadastrarprojetosComponent;
  let fixture: ComponentFixture<CadastrarprojetosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarprojetosComponent]
    });
    fixture = TestBed.createComponent(CadastrarprojetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarprojetosComponent } from './editarprojetos.component';

describe('EditarprojetosComponent', () => {
  let component: EditarprojetosComponent;
  let fixture: ComponentFixture<EditarprojetosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarprojetosComponent]
    });
    fixture = TestBed.createComponent(EditarprojetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

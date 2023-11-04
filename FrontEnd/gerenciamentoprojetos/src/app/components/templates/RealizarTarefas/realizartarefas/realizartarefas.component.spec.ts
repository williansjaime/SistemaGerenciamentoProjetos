import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizartarefasComponent } from './realizartarefas.component';

describe('RealizartarefasComponent', () => {
  let component: RealizartarefasComponent;
  let fixture: ComponentFixture<RealizartarefasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RealizartarefasComponent]
    });
    fixture = TestBed.createComponent(RealizartarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

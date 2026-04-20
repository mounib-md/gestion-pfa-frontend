import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfaForm } from './pfa-form';

describe('PfaForm', () => {
  let component: PfaForm;
  let fixture: ComponentFixture<PfaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PfaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

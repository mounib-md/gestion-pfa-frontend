import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncadrantForm } from './encadrant-form';

describe('EncadrantForm', () => {
  let component: EncadrantForm;
  let fixture: ComponentFixture<EncadrantForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncadrantForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EncadrantForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

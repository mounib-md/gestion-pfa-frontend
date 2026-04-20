import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfaList } from './pfa-list';

describe('PfaList', () => {
  let component: PfaList;
  let fixture: ComponentFixture<PfaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfaList],
    }).compileComponents();

    fixture = TestBed.createComponent(PfaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

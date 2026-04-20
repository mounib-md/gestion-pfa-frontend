import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfaDetail } from './pfa-detail';

describe('PfaDetail', () => {
  let component: PfaDetail;
  let fixture: ComponentFixture<PfaDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfaDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(PfaDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

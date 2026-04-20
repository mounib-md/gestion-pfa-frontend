import { TestBed } from '@angular/core/testing';

import { Pfa } from './pfa';

describe('Pfa', () => {
  let service: Pfa;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pfa);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

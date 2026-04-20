import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseList } from './entreprise-list';

describe('EntrepriseList', () => {
  let component: EntrepriseList;
  let fixture: ComponentFixture<EntrepriseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepriseList],
    }).compileComponents();

    fixture = TestBed.createComponent(EntrepriseList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TentantDashboard } from './tentant-dashboard';

describe('TentantDashboard', () => {
  let component: TentantDashboard;
  let fixture: ComponentFixture<TentantDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TentantDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(TentantDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

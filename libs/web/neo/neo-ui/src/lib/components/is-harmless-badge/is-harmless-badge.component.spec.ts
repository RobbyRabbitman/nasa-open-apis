import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsHarmlessBadgeComponent } from './is-harmless-badge.component';

describe('IsHarmlessBadgeComponent', () => {
  let component: IsHarmlessBadgeComponent;
  let fixture: ComponentFixture<IsHarmlessBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsHarmlessBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsHarmlessBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

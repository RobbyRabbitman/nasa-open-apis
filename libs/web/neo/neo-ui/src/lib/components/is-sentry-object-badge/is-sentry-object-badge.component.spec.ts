import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsSentryObjectBadgeComponent } from './is-sentry-object-badge.component';

describe('IsSentryObjectBadgeComponent', () => {
  let component: IsSentryObjectBadgeComponent;
  let fixture: ComponentFixture<IsSentryObjectBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsSentryObjectBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsSentryObjectBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

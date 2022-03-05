import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentryStatusComponent } from './sentry-status.component';

describe('SentryStatusComponent', () => {
  let component: SentryStatusComponent;
  let fixture: ComponentFixture<SentryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentryStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

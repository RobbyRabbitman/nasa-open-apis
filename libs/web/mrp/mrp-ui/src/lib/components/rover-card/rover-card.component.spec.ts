import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoverCardComponent } from './rover-card.component';

describe('RoverCardComponent', () => {
  let component: RoverCardComponent;
  let fixture: ComponentFixture<RoverCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoverCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoverCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

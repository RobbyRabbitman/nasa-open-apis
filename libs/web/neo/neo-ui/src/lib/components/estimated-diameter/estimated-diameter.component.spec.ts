import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatedDiameterComponent } from './estimated-diameter.component';

describe('EstimatedDiameterComponent', () => {
  let component: EstimatedDiameterComponent;
  let fixture: ComponentFixture<EstimatedDiameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimatedDiameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatedDiameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

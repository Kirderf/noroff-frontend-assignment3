import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerPageComponent } from './trainer-page.component';

describe('TrainerComponent', () => {
  let component: TrainerPageComponent;
  let fixture: ComponentFixture<TrainerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerPageComponent]
    });
    fixture = TestBed.createComponent(TrainerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

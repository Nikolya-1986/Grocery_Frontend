import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAccessorComponent } from './control-accessor.component';

describe('InputAccessorComponent', () => {
  let component: ControlAccessorComponent;
  let fixture: ComponentFixture<ControlAccessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlAccessorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlAccessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

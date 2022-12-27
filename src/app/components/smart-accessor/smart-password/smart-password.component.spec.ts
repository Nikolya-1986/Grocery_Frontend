import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartPasswordComponent } from './smart-password.component';

describe('SmartPasswordComponent', () => {
  let component: SmartPasswordComponent;
  let fixture: ComponentFixture<SmartPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

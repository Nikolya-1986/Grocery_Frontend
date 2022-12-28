import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartProfileComponent } from './smart-profile.component';

describe('SmartProfileComponent', () => {
  let component: SmartProfileComponent;
  let fixture: ComponentFixture<SmartProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

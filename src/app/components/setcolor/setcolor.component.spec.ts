import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetcolorComponent } from './setcolor.component';

describe('SetcolorComponent', () => {
  let component: SetcolorComponent;
  let fixture: ComponentFixture<SetcolorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetcolorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetcolorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

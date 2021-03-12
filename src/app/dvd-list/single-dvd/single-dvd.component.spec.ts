import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDvdComponent } from './single-dvd.component';

describe('SingleDvdComponent', () => {
  let component: SingleDvdComponent;
  let fixture: ComponentFixture<SingleDvdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDvdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDvdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

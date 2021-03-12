import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCdComponent } from './single-cd.component';

describe('SingleCdComponent', () => {
  let component: SingleCdComponent;
  let fixture: ComponentFixture<SingleCdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

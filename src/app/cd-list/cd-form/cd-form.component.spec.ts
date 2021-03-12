import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdFormComponent } from './cd-form.component';

describe('CdFormComponent', () => {
  let component: CdFormComponent;
  let fixture: ComponentFixture<CdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

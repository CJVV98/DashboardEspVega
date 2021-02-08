import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrAnsweredComponent } from './pqr-answered.component';

describe('PqrAnsweredComponent', () => {
  let component: PqrAnsweredComponent;
  let fixture: ComponentFixture<PqrAnsweredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PqrAnsweredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqrAnsweredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

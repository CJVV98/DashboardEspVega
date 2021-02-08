import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPqrComponent } from './list-pqr.component';

describe('ListPqrComponent', () => {
  let component: ListPqrComponent;
  let fixture: ComponentFixture<ListPqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPqrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

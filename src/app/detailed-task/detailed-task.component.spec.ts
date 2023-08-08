import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedTaskComponent } from './detailed-task.component';

describe('DetailedTaskComponent', () => {
  let component: DetailedTaskComponent;
  let fixture: ComponentFixture<DetailedTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedTaskComponent]
    });
    fixture = TestBed.createComponent(DetailedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

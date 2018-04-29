import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTickeComponent } from './book-ticke.component';

describe('BookTickeComponent', () => {
  let component: BookTickeComponent;
  let fixture: ComponentFixture<BookTickeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTickeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTickeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

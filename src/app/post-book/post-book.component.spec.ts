import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBookComponent } from './post-book.component';

describe('PostBookComponent', () => {
  let component: PostBookComponent;
  let fixture: ComponentFixture<PostBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

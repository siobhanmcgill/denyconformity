import { TestBed, waitForAsync } from '@angular/core/testing';
import {AppComponent} from './app.component';
import {setupTestModule} from './test/test.module.spec';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    setupTestModule({
      declarations: [AppComponent],
    })
      .compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

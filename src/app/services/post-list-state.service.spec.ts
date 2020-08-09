import {TestBed} from '@angular/core/testing';
import {setupTestModule} from '../test/test.module.spec';
import {PostListStateService} from './post-list-state.service';


describe('PostListStateService', () => {
  let service: PostListStateService;

  beforeEach(() => {
    setupTestModule();
    service = TestBed.inject(PostListStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

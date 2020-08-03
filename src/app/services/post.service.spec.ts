import {TestBed} from '@angular/core/testing';
import {setupTestModule} from '../test/test.module.spec';
import {PostService} from './post.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    setupTestModule();
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

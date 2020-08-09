import {Location} from '@angular/common';
import {Component, Input} from '@angular/core';
import {tick} from '@angular/core/testing';
import {environment} from 'src/environments/environment';
import {StubbedPostSeriesComponent} from '../post/post.component.spec';
import {PostListStateService} from '../services/post-list-state.service';
import {Post} from '../services/types';
import {POST_DATA} from '../test/posts.data.spec';
import {beforeEach, ComponentTestingModule, describe, it} from '../test/test.module.spec';
import {PostListComponent} from './post-list.component';

@Component({
  selector: 'app-post',
  template: '<div style="border: 1px solid #F00; height: 300px">App Post!</div>'
})
class StubbedPostComponent {
  @Input() post: Post;
}

describe('PostListComponent', () => {
  const module = new ComponentTestingModule(PostListComponent, {
    declarations:
        [StubbedPostComponent, StubbedPostSeriesComponent, PostListComponent]
  });
  let service: PostListStateService;

  beforeEach(() => {
    module.setup();
    service = module.inject(PostListStateService);
  });

  afterEach(() => {
    module.scroll(0, false);
  });

  it('should create', () => {
    expect(module.componentInstance).toBeTruthy();
  });

  describe('with posts', () => {
    beforeEach(() => {
      module.expectHttp(`${environment.server}/api/posts?page=1`, POST_DATA);
      module.flush();
    });

    it('tries to get posts', () => {
      expect(module.getEls('app-post').length).toBe(POST_DATA.results.length);
    });

    it('loads more posts when you scroll', () => {
      module.scroll(300 * POST_DATA.results.length);
      module.expectHttp(`${environment.server}/api/posts?page=2`, POST_DATA);
      module.flush();

      expect(module.getEls('app-post').length)
          .toBe(POST_DATA.results.length * 2);
    });

    it('opens a post when clicked', () => {
      const location = module.inject(Location);
      module.trigger('click', 'app-post');
      module.flush();
      tick(100);
      // Two flushes will clear up all of the event handlers.
      module.flush();
      module.flush();

      expect(location.path()).toBe(`/posts/${POST_DATA.results[0].slug}`);
      expect(module.getEls('app-post').length).toBe(1);
    });

    // This complicated thing will simulate somebody quickly scrolling and
    // selecting a post in the list.
    it('stops loading a new page when opening one', () => {
      module.scroll(1000, false);
      tick(200);
      module.detectChanges();
      tick(500);
      module.scroll(1500, false);
      module.trigger('click', 'app-post', false);
      tick(100);
      module.expectHttpCancelled(`${environment.server}/api/posts?page=2`);
      tick(500);
      module.flush();
      tick(500);
      expect(module.getEls('app-post').length).toBe(1);
    });
  });
});

import {Component} from '@angular/core';
import {environment} from 'src/environments/environment';
import {PostListStateService} from '../services/post-list-state.service';
import {PostService} from '../services/post.service';
import {Post} from '../services/types';
import {COMMENTS} from '../test/comments.data.spec';
import {POST_DATA} from '../test/posts.data.spec';
import {beforeEach, ComponentTestingModule, describe, it} from '../test/test.module.spec';
import {PostComponent} from './post.component';

const POST = POST_DATA.results[0];

@Component({
  selector: 'host-component',
  template: '<app-post [post]="post"></app-post>',
})
class PostHostComponent {
  post = POST;
}

@Component({selector: 'app-post-series', template: 'App Post Series!'})
export class StubbedPostSeriesComponent {
}

describe('PostComponent', () => {
  const module = new ComponentTestingModule(PostHostComponent, {
    declarations:
        [PostHostComponent, PostComponent, StubbedPostSeriesComponent],
  });
  let service: PostService;
  let stateService: PostListStateService;

  beforeEach(() => {
    module.setup();
    service = module.inject(PostService);
    stateService = module.inject(PostListStateService);
  });

  it('should be created without breaking', () => {
    expect(module.componentInstance).toBeTruthy();
  });

  it('does not show any of the expanded things', () => {
    expect(module.hasEl('app-post .summary')).toBeTrue();
    expect(module.hasEl('app-post .post')).toBeFalse();
    expect(module.hasEl('app-post app-post-series')).toBeFalse();
  });

  it('should render markdown in the summary', () => {
    const newPost: Post = JSON.parse(JSON.stringify(POST));
    newPost.summary = '__Bold!__';
    newPost.markdown = true;
    module.componentInstance.post = newPost;
    module.flush();
    const summary = module.getEl('.summary');
    expect(summary.innerHTML).toBe('<p><strong>Bold!</strong></p>');
  });

  describe('selected', () => {
    beforeEach(() => {
      (stateService as any).selectedPostId_ = POST.id;
      module.flush();
      // It has to flush twice to get everything accross.
      module.flush();
    });

    it('renders the whole shebang when the service has it selected', () => {
      expect(module.hasEl('.summary')).toBeFalse();
      expect(module.hasEl('.post')).toBeTrue();
    });

    it('shows comments when we get there', () => {
      expect(module.hasEl('.loading-comments')).toBeFalse();
      const eol = module.getEl('.end-of-line');
      const top = eol.offsetTop;
      module.scroll(top);
      expect(module.hasEl('.loading-comments')).toBeTrue();

      module.flush();
      module.expectHttp(
          `${environment.server}/api/posts/${POST.id}/comments/`, COMMENTS);
      module.flush();

      expect(module.hasEl('.comments')).toBeTrue();
    });
  });
});

import {Component, Input} from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../services/types';
import {POST_DATA} from '../test/posts.data.spec';
import {beforeEach, ComponentTestingModule, describe, it} from '../test/test.module.spec';
import {PostListComponent} from './post-list.component';

@Component({
  selector: 'app-post',
  template: 'App Post!'
})
class StubbedPostComponent {
  @Input() post: Post;
}

describe('PostListComponent', () => {
  const module = new ComponentTestingModule(PostListComponent, {
    declarations: [StubbedPostComponent, PostListComponent]
  });
  let service: PostService;

  beforeEach(() => {
    module.setup();
    service = module.inject(PostService);
  });

  it('should create', () => {
    expect(module.componentInstance).toBeTruthy();
  });

  it('tries to get posts', () => {
    module.expectHttp(service.nextPage, POST_DATA);
    module.flush();

    expect(module.hasEl('app-post')).toBeTrue();
  });
});

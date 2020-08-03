import {Component} from '@angular/core';
import {PostService} from '../services/post.service';
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

@Component({
  selector: 'app-post-series',
  template: 'App Post Series!'
})
class StubbedPostSeriesComponent {
}

describe('PostComponent', () => {
  const module = new ComponentTestingModule(PostHostComponent, {
    declarations: [
      PostHostComponent, PostComponent, StubbedPostSeriesComponent
    ],
  });
  let service: PostService;

  beforeEach(() => {
    module.setup();
    service = module.inject(PostService);
  });

  it('should be created without breaking', () => {
    expect(module.componentInstance).toBeTruthy();
  });

  it('should expand when clicked', () => {
    expect(module.hasEl('app-post .post')).toBeFalse();
    module.trigger('click', 'app-post');
    expect(module.hasEl('app-post .post')).toBeTrue();
  });

  it('should expand when the service triggers the select post event', () => {
    expect(module.hasEl('app-post .post')).toBeFalse();
    service.selectPost(POST);
    module.flush();
    expect(module.hasEl('app-post .post')).toBeTrue();
    service.selectPost();
    module.flush();
    expect(module.hasEl('app-post .post')).toBeFalse();
  });
});

import {Component} from '@angular/core';
import {POST_DATA} from '../test/posts.data.spec';
import {beforeEach, ComponentTestingModule, describe, it} from '../test/test.module.spec';
import {ReadPostComponent} from './read-post.component';

const POST = POST_DATA.results[0];

@Component({
  selector: 'host-component',
  template: '<app-read-post [post]="post"></app-read-post>',
})
class PostHostComponent {
  post = POST;
}

describe('ReadPostComponent', () => {
  const module = new ComponentTestingModule(PostHostComponent, {
    declarations: [ReadPostComponent, PostHostComponent]
  });

  beforeEach(() => {
    module.setup();
  });

  it('should create', () => {
    expect(module.componentInstance).toBeTruthy();
  });
});

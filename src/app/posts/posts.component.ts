import {Component, HostBinding, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Post, PostService} from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @HostBinding('class.screen') screenClass = true;

  posts$: Observable<Post[]>;
  postsShowing = 10;

  selectedPost?: Post;
  readPosition = 0;

  constructor(private readonly postService: PostService) {
    this.posts$ = this.postService.getPosts().pipe(map(posts => {
      return posts.slice(0, this.postsShowing);
    }));
  }

  ngOnInit() {}

  decodeString(string: string): string {
    return this.postService.decodeString(string);
  }

  selectPost(post: Post, summary: HTMLDivElement) {
    if (this.selectedPost) {
      const existingId = this.selectedPost.id;
      this.selectedPost = null;
      if (post.id === existingId) {
        return;
      }
      setTimeout(() => {
        this.selectPost(post, summary);
      }, 300);
    } else {
      this.readPosition = summary.offsetTop;
      this.selectedPost = post;
    }
  }
}

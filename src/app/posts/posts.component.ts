import {Component, HostBinding, OnInit, ViewChildren, ElementRef, QueryList} from '@angular/core';
import {Observable} from 'rxjs';
import {map, take, tap, delayWhen} from 'rxjs/operators';
import {Post, PostService} from '../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { PostSummaryComponent } from '../post-summary/post-summary.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @HostBinding('class.screen') screenClass = true;

  @ViewChildren('postSummary') summaries: QueryList<PostSummaryComponent>;

  posts$: Observable<Post[]>;
  postsShowing = 10;

  selectedPost?: Post;
  readPosition = 0;

  constructor(
    private readonly postService: PostService,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    ) {
    this.posts$ = this.postService.getPosts().pipe(map(posts => {
      return posts.slice(0, this.postsShowing);
    }));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postService.getPost(params.id).subscribe(post => {
        
      });
    });
  }

  autoSelectPost(post: Post) {
    this.summaries.forEach(summary => {
      if (summary.id === post.id) {
        this.selectPost(post, summary);
      }
    });
  }

  decodeString(string: string): string {
    return this.postService.decodeString(string);
  }

  selectPost(post: Post, summary: PostSummaryComponent) {
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
      this.location.go('/p/' + post.id);
      this.readPosition = summary.top;
      this.selectedPost = post;
    }
  }
}

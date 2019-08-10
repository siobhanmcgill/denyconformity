import {Location} from '@angular/common';
import {ChangeDetectorRef, Component, ElementRef, HostBinding, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppComponent} from '../app.component';
import {PostSummaryComponent} from '../post-summary/post-summary.component';
import {Post, PostService} from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  @HostBinding('class.screen') screenClass = true;

  @ViewChild('wrapper', {static: false})
  summaryWrapper: ElementRef<HTMLDivElement>;

  @ViewChildren('postSummary') summaries: QueryList<PostSummaryComponent>;

  posts$: Observable<boolean>;
  allPosts: Post[];
  posts: Post[];
  postsShowing = 10;

  selectedPost?: Post;
  readPosition = 0;

  parallaxPos = 0;

  constructor(
      private readonly appComponent: AppComponent,
      private readonly postService: PostService,
      private readonly route: ActivatedRoute,
      private readonly location: Location,
      private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.posts$ = combineLatest(this.postService.getPosts(), this.route.params)
                      .pipe(map(data => {
                        const params = data[1];
                        const posts = data[0];
                        if (params.id) {
                          const post =
                              posts.filter(post => post.id === +params.id)[0];
                          if (post) {
                            setTimeout(() => {
                              this.selectPost(post);
                            });
                          }
                        }
                        this.allPosts = posts;
                        this.slicePosts();
                        return true;
                      }));

    this.appComponent.position$.subscribe(pos => {
      // Adds parallax to posts when one is open.
      // if (this.selectedPost) {
      //   const p = (pos - this.parallaxPos) * .1;
      //   this.summaries.forEach(summary => {
      //     if (summary.id !== this.selectedPost.id) {
      //       summary.parallax = p;
      //     }
      //   });
      // } else {
      //   this.parallaxPos = pos;
      // }
      // Shows more posts when scrolling to the bottom.
      if (this.summaries &&
          pos + window.innerHeight >= this.summaries.last.top &&
          this.postsShowing < this.allPosts.length) {
        this.postsShowing += 10;
        this.slicePosts();
      }
    });
  }

  slicePosts() {
    this.posts = this.allPosts.slice(0, this.postsShowing);
  }

  decodeString(string: string): string {
    return this.postService.decodeString(string);
  }

  selectPost(post: Post, summary?: PostSummaryComponent) {
    const index = this.allPosts.findIndex(p => p.id === post.id);
    if (index && index > this.postsShowing) {
      this.postsShowing = index + 5;
      this.slicePosts();
      this.changeDetectorRef.detectChanges();
    }

    if (this.selectedPost) {
      const existingId = this.selectedPost.id;
      this.selectedPost = null;
      this.summaries.forEach(summary => {
        summary.parallax = 0;
      });
      if (post.id === existingId) {
        this.location.go('/p');
        return;
      }
      setTimeout(() => {
        this.selectPost(post, summary);
      }, 300);
    } else {
      this.location.go('/p/' + post.id);
      if (this.summaries && !summary) {
        this.summaries.forEach(s => {
          if (s.id === post.id) {
            summary = s;
            this.parallaxPos = summary.top;
            this.appComponent.scrollTo(summary.top);
          }
        });
      }

      if (summary) {
        this.readPosition = summary.top;
      }
      this.selectedPost = post;
    }
  }

  previousPost(index: number) {
    if (index > 0) {
      this.selectPost(this.allPosts[index - 1]);
    }
  }

  nextPost(index: number) {
    this.selectPost(this.allPosts[index + 1]);
  }
}

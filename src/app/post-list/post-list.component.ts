import {Location} from '@angular/common';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {skip, tap} from 'rxjs/operators';
import {PostService} from '../services/post.service';
import {Post} from '../services/types';
import {createToggle} from '../shared/anim';
import {POST_PREFIX} from '../shared/const';
import {scrollToTop} from '../shared/ui.util';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    createToggle('spacer', {'height': '0'}, {'height': '*'}, 500),
    createToggle(
        'title', {'height': '0', 'padding': '0', 'opacity': '0'},
        {'height': '*', 'padding': '*', 'opacity': '1'}, 500),
    createToggle(
        'postTitle', {'transform': 'translateY(-100%)', 'height': '0'},
        {'transform': 'translateY(0)', 'height': '*'}, 500),
    createToggle('post', {'height': '0'}, {'height': '*'}, 500),
  ]
})
export class PostListComponent implements OnDestroy {
  posts$: Observable<Array<Post>>;

  selectedPost?: Post;
  postToRead?: Post;

  isLoading = false;

  private postsSetup = false;
  private postSubscription: Subscription;

  constructor(
      private readonly postService: PostService,
      private readonly location: Location,
      private readonly route: ActivatedRoute,
      private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.posts$ = this.postService.posts$.pipe(tap(() => {
      this.isLoading = false;
    }));

    this.route.params.subscribe(params => {
      if (params && params.id) {
        // If the ID is not a number, it's a slug.
        const isSlug = isNaN(Number(params.id));
        if (isSlug) {
          this.postService.getPost(params.id);
        } else {
          this.postService.getPostById(params.id);
        }
      } else {
        this.setupPostsObservable();
      }
    });

    this.postSubscription =
        this.postService.postSelection$.pipe(skip(1)).subscribe(post => {
          this.selectedPost = post;
          // Load the list of posts.
          if (!post && this.location.isCurrentPathEqualTo(POST_PREFIX)) {
            setTimeout(() => {
              this.setupPostsObservable();
            }, 500);
          } else if (post) {
            // A post has been loaded, so scroll to the top.
            scrollToTop();

            if (this.location.isCurrentPathEqualTo(
                    POST_PREFIX + '/' + post.id)) {
              this.location.go(POST_PREFIX + '/' + post.slug);
            }
          }
          this.changeDetectorRef.detectChanges();
        });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  setupPostsObservable() {
    if (this.postsSetup) {
      return;
    }
    this.postService.fetchPage();
    this.postsSetup = true;
  }

  fetchNextPage() {
    if (this.postsSetup) {
      this.postService.fetchPage();
      this.isLoading = true;
    }
  }

  home() {
    this.location.go(POST_PREFIX);
  }

  postTrackBy(index: number, item: Post): number {
    return item.id;
  }

  openPostToRead(post: Post) {
    this.postToRead = post;
  }

  closePostToRead() {
    this.postToRead = null;
  }
}

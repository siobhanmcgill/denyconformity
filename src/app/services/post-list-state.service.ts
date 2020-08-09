import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, Subscription, timer} from 'rxjs';
import {scrollToTop} from '../shared/ui.util';
import {PostService} from './post.service';
import {Post, Series} from './types';

export interface PostListItem {
  type: 'post'|'loadmore'|'series'|'similar_heading'|'no_results'|
      'similars_loading';
  series?: Series;
  post?: Post;
  page?: number;
}

@Injectable({providedIn: 'root'})
export class PostListStateService {
  private pageIndex = 1;

  private selectedPostId_?: number;
  private postListSubject = new BehaviorSubject<PostListItem[]>(null);
  private postSelectionSubject = new BehaviorSubject<Post|null>(null);
  private seriesSubject = new BehaviorSubject<Series|null>(null);

  private pageSubscription: Subscription;
  private seriesSubscription: Subscription;

  get page() {
    return this.pageIndex;
  }

  get selectedPostId() {
    return this.selectedPostId_;
  }

  get selection$() {
    return this.postSelectionSubject.asObservable();
  }

  get series$() {
    return this.seriesSubject.asObservable();
  }

  constructor(
      private readonly postService: PostService,
      private readonly location: Location,
  ) {
    this.location.onUrlChange((url, state) => {
      console.log('URL CHANGE', url, state);
      const postsRegex = /\/posts\/([a-z0-9\-]+)$/gi;
      const seriesRegex = /\/series\/([a-z0-9\-]+)(;post=([a-z0-9\-]+))?$/gi;

      if (url.match(postsRegex)) {
        // If pushing a new post to the stack, select it and scroll to top.
        const slug = url.replace(postsRegex, '$1');
        if (state && this.selectedPostId) {
          // State is set if this was caused by the back button.
          // If a post is selected and we are going back to a different one,
          // we want a slightly different animation.
          combineLatest(
              this.postService.fetchPostById(this.selectedPostId),
              this.postService.fetchPost(slug))
              .subscribe(posts => {
                this.selectedPostId_ = null;
                this.broadcast({posts});
                setTimeout(() => {
                  this.selectPost(slug);
                }, 650);
              });
        } else {
          this.selectPost(slug);
          // State is null when this is a new navigation - the user clicked on a
          // link.
          scrollToTop();
        }
      } else if (url.match(seriesRegex)) {
        const slug = url.replace(seriesRegex, '$1');
        this.showSeries(slug);

        // If the url includes a series matrix param, load the series first.
        const postSlug = url.replace(seriesRegex, '$3');
        if (postSlug) {
          setTimeout(() => {
            this.selectPost(postSlug);
          }, 500);
        }

      } else {
        // Go "home"
        this.showList();
      }

      // If going back, scroll to the position in the scrollPositionHistory.
    });
  }

  broadcast({posts, more, series, loadingSimilar, similars}: {
    posts?: Post[];
    more?: boolean;
    loadingSimilar?: boolean;
    series?: Series;
    similars?: Post[];
  }) {
    console.log('broadcast', posts, more, series, similars);
    let items: PostListItem[];
    if (posts) {
      items = posts.map(post => {
        return {
          post,
          type: 'post',
        };
      });
    } else if (series) {
      items = series.posts.map(post => {
        return {type: 'post', post: post.post};
      });
      items.unshift({type: 'series', series});
    } else {
      items = [{type: 'no_results'}];
    }
    if (more) {
      items.push({type: 'loadmore', page: this.pageIndex});
    }
    if (loadingSimilar) {
      items.push({type: 'similars_loading'})
    }
    if (similars) {
      items = items.concat(
          [{type: 'similar_heading'}],
          similars.map(post => {
            return {post, type: 'post'};
          }),
      );
    }
    this.postListSubject.next(items);
  }

  init(selectedPostSlug?: string, selectedSeriesSlug?: string):
      Observable<PostListItem[]> {
    if (selectedPostSlug) {
      this.selectPost(selectedPostSlug, 2000);
    } else if (selectedSeriesSlug) {
      this.showSeries(selectedSeriesSlug);
    } else {
      this.showList();
    }
    return this.postListSubject.asObservable();
  }

  nextPage() {
    if (this.postService.nextPageIndex >= this.pageIndex) {
      const pages = [];
      // Load all pages, including the next one.
      for (let cnt = 1; cnt <= this.pageIndex + 1; cnt++) {
        pages.push(this.postService.fetchPage(cnt));
      }
      this.pageSubscription = combineLatest(...pages).subscribe(pageData => {
        this.pageIndex++;
        const posts: Post[] =
            pageData.reduce((last, current) => last.concat(current));
        this.broadcast({posts, more: true});
      });
    }
  }

  loadSimilarPosts(post: Post) {
    this.broadcast({posts: [post], loadingSimilar: true});
    this.pageSubscription =
        this.postService.fetchSimilarPosts(post).subscribe(posts => {
          this.broadcast({posts: [post], similars: posts});
        });
  }

  resetSubscriptions() {
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
    if (this.seriesSubscription) {
      this.seriesSubscription.unsubscribe();
    }
  }

  showSeries(seriesSlug: string) {
    this.resetSubscriptions();
    this.postService.fetchSeries(seriesSlug).subscribe(series => {
      // Hide any series summary objects.
      this.seriesSubject.next(null);
      // Deselect the post.
      this.selectedPostId_ = null;
      this.postSelectionSubject.next(null);
      // Show all the posts for this series.
      this.broadcast({series});
    });
  }

  showList() {
    this.resetSubscriptions();
    // Hide any series summary objects.
    this.seriesSubject.next(null);
    // Deselect the post.
    this.selectedPostId_ = null;
    this.postSelectionSubject.next(null);
    // Show all loaded posts.
    if (this.pageIndex > 0) {
      this.pageIndex--;
    }
    this.nextPage();
  }

  selectPost(postSlug: string, delay = 0) {
    this.resetSubscriptions();
    combineLatest(timer(delay), this.postService.fetchPost(postSlug))
        .subscribe(([, post]) => {
          // Only this post should show in the list.
          this.broadcast({posts: [post]});
          // This timeout makes sure the post animates in properly.
          setTimeout(() => {
            this.selectedPostId_ = post.id;
            this.postSelectionSubject.next(post);
          }, 10);
          // Load the series data for this post.
          this.seriesSubscription =
              this.postService.fetchSeriesForPost(post).subscribe(series => {
                this.seriesSubject.next(series);
              });
        });
  }
}

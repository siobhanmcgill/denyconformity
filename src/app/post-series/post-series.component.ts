import {Location} from '@angular/common';
import {ChangeDetectorRef, Component, HostBinding, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {PostListStateService} from '../services/post-list-state.service';
import {PostService} from '../services/post.service';
import {Post, Series} from '../services/types';
import {createToggle} from '../shared/anim';
import {SERIES_PREFIX} from '../shared/const';

const MOBILE_WIDTH = 500;

@Component({
  selector: 'app-post-series',
  templateUrl: './post-series.component.html',
  styleUrls: ['./post-series.component.scss'],
  animations: [createToggle(
      'series', {'margin-top': '-100px'}, {'margin-top': '*'}, 300)],
})
export class PostSeriesComponent {
  @Input() extended = false;

  // post?: Post;
  // seriesSubscription?: Subscription;
  // series?: Series;

  series$: Observable<Series|null>;
  post$: Observable<Post|null>;

  @HostBinding('className')
  get className(): string {
    return this.extended ? '' : 'content';
  }

  postClassName = '';
  // get postClassName(): string {
  //   // return this.postService.postClassName(this.post);
  //   return '';
  // }

  partList: Array<{label: string, index: number, post: Post}>;

  // get partList(): number[] {
  //   if (!this.series) {
  //     return [];
  //   }
  // if (window.innerWidth > MOBILE_WIDTH || this.extended ||
  //     this.series.posts.length < 7) {
  //   return this.series.posts.map((p, i) => i + 1);
  // }
  //   const currentIndex =
  //       this.series.posts.findIndex(p => p.post.id === this.post.id);
  //   const parts = [];
  //   const maxIndex = this.series.posts.length - 1;
  //   const spacePastCurrent = Math.min(maxIndex - currentIndex, 3);
  //   const spaceBeforeCurrent = Math.min(currentIndex, 5 - spacePastCurrent);
  //   let skipping = false;
  //   this.series.posts.forEach((p, i) => {
  //     if (i === 0 || i === currentIndex + 1 || i === currentIndex - 1 ||
  //         i === currentIndex || i === maxIndex ||
  //         (i > currentIndex - spaceBeforeCurrent &&
  //          i < currentIndex + spacePastCurrent)) {
  //       parts.push(i + 1);
  //       skipping = false;
  //     } else if (!skipping) {
  //       parts.push(-1);
  //       skipping = true;
  //     }
  //   });
  //   return parts;
  // }

  currentPartNumber = 0;
  // get thisPart(): number {
  //   // return this.series.posts.findIndex(p => p.post.id === this.post.id) +
  //   1; return 1;
  // }

  nextPostTitle = '';
  // get nextPostTitle(): string {
  //   // return this.series.posts[this.thisPart].post.title;
  //   return 'Next';
  // }

  constructor(
      private readonly postStateService: PostListStateService,
      private readonly postService: PostService,
      private readonly changeDetectorRef: ChangeDetectorRef,
      private readonly location: Location,
  ) {
    this.post$ = this.postStateService.selection$.pipe(tap(post => {
      if (post) {
        this.postClassName = this.postService.postClassName(post);
      }
    }));
    this.series$ = this.postStateService.series$.pipe(tap(series => {
      if (series) {
        if (window.innerWidth > MOBILE_WIDTH || this.extended ||
            series.posts.length < 7) {
          this.partList = series.posts.map((p, i) => {
            const index = i + 1;
            return {
              label: p.label || 'Part ' + index,
              index: i + 1,
              post: p.post
            };
          });
        }
        this.currentPartNumber =
            series.posts.findIndex(
                p => p.post.id === this.postStateService.selectedPostId) +
            1;
        if (this.currentPartNumber < series.posts.length) {
          this.nextPostTitle = series.posts[this.currentPartNumber].post.title;
        } else {
          this.nextPostTitle = '';
        }
      } else {
        this.partList = [];
      }
    }));

    // this.postStateService.selection$.subscribe(post => {
    //   this.post = post;
    //   console.log('post selected for series', post);
    //   if (this.seriesSubscription) {
    //     this.seriesSubscription.unsubscribe();
    //   }
    //   this.seriesSubscription =
    //   this.postService.fetchSeries(post).subscribe(series => {
    //     console.log('series?', series);
    //     this.series = series;
    //   });
    // });

    // this.postService.series$.pipe(skip(1)).subscribe(series => {
    //   this.series = series;

    // if (this.series) {
    //   if (window.innerWidth > MOBILE_WIDTH || this.extended ||
    //     this.series.posts.length < 7) {
    //     this.partList = this.series.posts.map((p, i) => {
    //       const index = i + 1;
    //       return {
    //         label: p.label || 'Part ' + index,
    //         index: i + 1,
    //         post: p.post
    //       };
    //     });
    //   }
    // } else {
    //   this.partList = [];
    // }

    //   this.changeDetectorRef.detectChanges();
    // }, error => {
    //   // Do nothing on errors - chances are there just isn't a series for
    //   this post.
    // });
  }

  gotoPost(e: MouseEvent, series: Series, post: Post) {
    e.stopPropagation();
    this.location.go(`${SERIES_PREFIX}/${series.slug};post=${post.slug}`);
    // this.location.go(`${SERIES_PREFIX}/${series.slug}`);
    // setTimeout(() => {
    //   this.location.replaceState(`${POST_PREFIX}/${post.slug}`);
    // }, 1000);

    // this.location.go(`${POST_PREFIX}/${post.slug}`);
    // if (post.id !== this.post.id) {
    //   const gotoPost = post;
    //   // Show just the posts for this series.
    //   this.postService.broadcastPosts(
    //     series.posts.map(seriesPost => seriesPost.post));
    //   // Deselect the post.
    //   this.postService.selectPost();

    //   setTimeout(() => {
    //     // Open the selected post after the animation finishes.
    //     this.location.go(POST_PREFIX + '/' + gotoPost.id);
    //     this.postService.selectPost(gotoPost);
    //   }, 1000);
    // }
  }

  nextPost(e: MouseEvent, series: Series) {
    this.gotoPost(e, series, series.posts[this.currentPartNumber].post);
  }

  goToSeries(e: MouseEvent, series: Series) {
    e.stopPropagation();
    this.location.go(`${SERIES_PREFIX}/${series.slug}`);
  }
}

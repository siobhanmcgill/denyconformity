import {Location} from '@angular/common';
import {ChangeDetectorRef, Component, HostBinding, Input} from '@angular/core';
import {skip} from 'rxjs/operators';
import {PostService} from '../services/post.service';
import {Post, Series} from '../services/types';
import {createToggle} from '../shared/anim';
import {POST_PREFIX} from '../shared/const';

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

  post?: Post;
  series?: Series;

  @HostBinding('className')
  get className(): string {
    return this.extended ? '' : 'content';
  }

  get postClassName(): string {
    return this.postService.postClassName(this.post);
  }

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

  get thisPart(): number {
    return this.series.posts.findIndex(p => p.post.id === this.post.id) + 1;
  }

  get nextPostTitle(): string {
    return this.series.posts[this.thisPart].post.title;
  }

  constructor(
      private readonly postService: PostService,
      private readonly changeDetectorRef: ChangeDetectorRef,
      private readonly location: Location,
  ) {
    this.postService.postSelection$.subscribe(post => {
      this.post = post;
    });

    this.postService.series$.pipe(skip(1)).subscribe(series => {
      this.series = series;

      if (this.series) {
        if (window.innerWidth > MOBILE_WIDTH || this.extended ||
            this.series.posts.length < 7) {
          this.partList = this.series.posts.map((p, i) => {
            const index = i + 1;
            return {
              label: p.label || 'Part ' + index,
              index: i + 1,
              post: p.post
            };
          });
        }
      } else {
        this.partList = [];
      }

      this.changeDetectorRef.detectChanges();
    });
  }

  gotoPost(e: MouseEvent, series: Series, post: Post) {
    e.stopPropagation();
    if (post.id !== this.post.id) {
      const gotoPost = post;
      // Show just the posts for this series.
      this.postService.broadcastPosts(
          series.posts.map(seriesPost => seriesPost.post));
      // Deselect the post.
      this.postService.selectPost();

      setTimeout(() => {
        // Open the selected post after the animation finishes.
        this.location.go(POST_PREFIX + '/' + gotoPost.id);
        this.postService.selectPost(gotoPost);
      }, 1000);
    }
  }

  nextPost(e: MouseEvent, series: Series) {
    this.gotoPost(e, series, series.posts[this.thisPart].post);
  }
}

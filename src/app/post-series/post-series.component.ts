import {Location} from '@angular/common';
import {ChangeDetectorRef, Component, HostBinding, Input} from '@angular/core';
import {PostService} from '../services/post.service';
import {Post, Series} from '../services/types';
import {createToggle} from '../shared/anim';

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

  private skipNextNullPost = false;

  @HostBinding('className')
  get className(): string {
    return this.extended ? '' : 'content';
  }
  get partList(): number[] {
    if (!this.series) {
      return [];
    }
    if (window.innerWidth > MOBILE_WIDTH || this.extended ||
        this.series.posts.length < 7) {
      return this.series.posts.map((p, i) => i + 1);
    }
    const currentIndex =
        this.series.posts.findIndex(p => p.id === this.post.id);
    const parts = [];
    const maxIndex = this.series.posts.length - 1;
    const spacePastCurrent = Math.min(maxIndex - currentIndex, 3);
    const spaceBeforeCurrent = Math.min(currentIndex, 5 - spacePastCurrent);
    let skipping = false;
    this.series.posts.forEach((p, i) => {
      if (i === 0 || i === currentIndex + 1 || i === currentIndex - 1 ||
          i === currentIndex || i === maxIndex ||
          (i > currentIndex - spaceBeforeCurrent &&
           i < currentIndex + spacePastCurrent)) {
        parts.push(i + 1);
        skipping = false;
      } else if (!skipping) {
        parts.push(-1);
        skipping = true;
      }
    });
    return parts;
  }

  get thisPart(): number {
    return this.series.posts.findIndex(p => p.id === this.post.id) + 1;
  }

  get nextPostTitle(): string {
    return this.series.posts[this.thisPart].title;
  }

  getPostIdForIndex(index: number): number {
    return this.series.posts[index - 1].id;
  }

  constructor(
      private readonly postService: PostService,
      private readonly changeDetectorRef: ChangeDetectorRef,
      private readonly location: Location,
  ) {
    this.postService.postSelection$.subscribe(post => {
      if (!post && this.skipNextNullPost) {
        this.skipNextNullPost = false;
        return;
      }

      this.post = post;
      if (post && this.series &&
          this.series.posts.find(p => p.id === post.id)) {
        // If the new post is part of the same series, we don't need to re-fetch
        // the series.
        return;
      }
      this.series = null;
      if (post) {
        this.postService.getSeries(this.post).subscribe(series => {
          this.series = series;
          this.changeDetectorRef.detectChanges();
        });
      }
    });
  }

  gotoPost(e: MouseEvent, series: Series, index: number) {
    e.stopPropagation();
    const id = this.getPostIdForIndex(index);
    if (id !== this.post.id) {
      this.skipNextNullPost = true;
      this.post = this.series.posts[index - 1];
      // Show just the posts for this series.
      this.postService.broadcastPosts(series.posts);
      // Deselect the post.
      this.postService.selectPost();

      setTimeout(() => {
        // Open the selected post after the animation finishes.
        this.location.go('/p/' + this.post.id);
        this.postService.selectPost(this.post);
      }, 1000);
    }
  }

  nextPost(e: MouseEvent, series: Series) {
    this.gotoPost(e, series, this.thisPart + 1);
  }
}

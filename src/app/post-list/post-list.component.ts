import {Location} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {shareReplay, switchMap, tap} from 'rxjs/operators';

import {PostListItem, PostListStateService} from '../services/post-list-state.service';
import {PostService} from '../services/post.service';
import {Post, Series} from '../services/types';
import {createToggle} from '../shared/anim';
import {POST_PREFIX, SERIES_PREFIX} from '../shared/const';
import {MarkdownServiceService} from '../shared/markdown-service.service';

/**
 *  We can make a custom right click menu for posts, to copy url, open
 * in a new tab, etc. Also it should be possible to manually create a method of
 * "ctrl + click" to open a post in a new tab.
 *
 * -Shauvon
 */


/** Shows a list of posts, as determined by the PostListState service. */
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    createToggle({
      name: 'spacer',
      outStyle: {'height': '0'},
      inStyle: {'height': '*'},
      durationMs: 500
    }),
    createToggle({
      name: 'title',
      outStyle: {'height': '0', 'padding': '0', 'opacity': '0'},
      inStyle: {'height': '*', 'padding': '*', 'opacity': '1'},
      durationMs: 500
    }),
    createToggle({
      name: 'postTitle',
      outStyle: {'transform': 'translateY(-100%)', 'height': '0'},
      inStyle: {'transform': 'translateY(0)', 'height': '*'},
      durationMs: 500
    }),
    createToggle({
      name: 'post',
      outStyle:
          {'overflow': 'hidden', 'height': '0', 'margin': '0', 'opacity': '0'},
      inStyle: {'height': '*', 'margin': '*', 'opacity': '1'},
      durationMs: 500
    }),
  ]
})
export class PostListComponent {
  postToRead?: Post;

  isLoading = true;

  isPostSelected() {
    return !!this.service.selectedPostId;
  }

  constructor(
      private readonly service: PostListStateService,
      private readonly postService: PostService,
      private readonly location: Location,
      private readonly route: ActivatedRoute,
      private readonly markdownService: MarkdownServiceService,
  ) {}

  posts$ = this.route.params.pipe(
      switchMap(params => {
        this.isLoading = true;
        let slug = null;
        let seriesSlug = null;
        if (params && (params.slug || params.post)) {
          slug = params.slug || params.post;
        } else if (params && params.seriesSlug) {
          seriesSlug = params.seriesSlug;
        }
        return this.service.init(slug, seriesSlug);
      }),
      tap(l => {
        this.isLoading = !!l;
      }));

  private readonly tripleMoon$ = this.postService.getTripleMoon();
  private readonly randomComedy$ =
      this.postService.getRandomPostByTag('comedy');
  private readonly randomOther$ =
      this.postService.getRandomPostByTag('fiction');

  linkyTitles = ['hot', 'funny', 'else'];

  private readonly reloadLinkies$ = new BehaviorSubject<boolean>(true);
  readonly linkies$ = this.reloadLinkies$.pipe(
      switchMap(
          () => combineLatest(
              [this.tripleMoon$, this.randomComedy$, this.randomOther$])),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      }),
      tap(() => {
        setTimeout(() => {
          this.refreshLinks();
        }, 20000);
      }));

  refreshLinks() {
    this.reloadLinkies$.next(true);
  }

  linkiesTrackBy(i: number) {
    return i;
  }

  renderLinkSummary(post: Post) {
    const html = this.markdownService.renderPostText(post, 'summary');
    return html.replace(/<img(.*)>/gi, '[Image]');
  }

  fetchNextPage() {
    this.isLoading = true;
    this.service.nextPage();
  }

  private getPostOrSeriesUrl(item: Post|Series): string {
    if ((item as Series).description) {
      const series = item as Series;
      return `${SERIES_PREFIX}/${series.slug}`;
    } else {
      const post = item as Post;
      if (this.service.selectedPostId !== post.id) {
        return `${POST_PREFIX}/${post.slug}`;
      }
    }
    return '';
  }

  selectPost(event: MouseEvent, item: Post|Series) {
    const url = this.getPostOrSeriesUrl(item);
    if (url) {
      this.location.go(url);
    }
  }

  postMouseDown(event: MouseEvent, item: Post|Series) {
    // Prevent middle clicks on posts from doing the little scroll thingie.
    if (event.which === 2) {
      event.stopPropagation();
      return false;
    }
  }

  postMouseUp(event: MouseEvent, item: Post|Series) {
    // On middle click, open the post in a new tab.
    if (event.which === 2) {
      event.stopPropagation();
      const url = this.getPostOrSeriesUrl(item);
      if (url) {
        window.open(url);
      }
      return false;
    }
  }

  home() {
    this.location.go(POST_PREFIX);
  }

  listItemTrackBy(index: number, item: PostListItem): string {
    if (item.post) {
      return 'post' + item.post.id;
    } else if (item.series) {
      return 'series' + item.series.id;
    } else if (item.type === 'loadmore') {
      return 'load-page-' + item.page;
    } else {
      return item.type;
    }
  }

  openPostToRead(post: Post) {
    this.postToRead = post;
  }

  closePostToRead() {
    this.postToRead = null;
  }
}

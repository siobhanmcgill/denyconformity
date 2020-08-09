import {Location} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {PostListItem, PostListStateService} from '../services/post-list-state.service';
import {Post} from '../services/types';
import {createToggle} from '../shared/anim';
import {POST_PREFIX} from '../shared/const';

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
    createToggle('spacer', {'height': '0'}, {'height': '*'}, 500),
    createToggle(
        'title', {'height': '0', 'padding': '0', 'opacity': '0'},
        {'height': '*', 'padding': '*', 'opacity': '1'}, 500),
    createToggle(
        'postTitle', {'transform': 'translateY(-100%)', 'height': '0'},
        {'transform': 'translateY(0)', 'height': '*'}, 500),
    createToggle(
        'post',
        {'overflow': 'hidden', 'height': '0', 'margin': '0', 'opacity': '0'},
        {'height': '*', 'margin': '*', 'opacity': '1'}, 500),
  ]
})
export class PostListComponent {
  posts$: Observable<Array<PostListItem>>;

  postToRead?: Post;

  isLoading = true;

  get isPostSelected(): boolean {
    return !!this.service.selectedPostId;
  }

  constructor(
      private readonly service: PostListStateService,
      private readonly location: Location,
      private readonly route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      let slug = null;
      let seriesSlug = null;
      if (params && (params.slug || params.post)) {
        slug = params.slug || params.post;
      } else if (params && params.seriesSlug) {
        seriesSlug = params.seriesSlug;
      }
      this.posts$ = this.service.init(slug, seriesSlug).pipe(tap((listData) => {
        console.log('list data', listData);
        this.isLoading = false;
      }));
    });
  }

  fetchNextPage() {
    this.isLoading = true;
    this.service.nextPage();
  }

  selectPost(event: MouseEvent, post: Post) {
    if (this.service.selectedPostId !== post.id) {
      this.location.go(`${POST_PREFIX}/${post.slug}`);
    }
  }

  postMouseDown(event: MouseEvent, post: Post) {
    // Prevent middle clicks on posts from doing the little scroll thingie.
    if (event.which === 2 && post.id !== this.service.selectedPostId) {
      event.stopPropagation();
      return false;
    }
  }

  postMouseUp(event: MouseEvent, post: Post) {
    // On middle click, open the post in a new tab.
    if (event.which === 2 && post.id !== this.service.selectedPostId) {
      event.stopPropagation();
      window.open(`${POST_PREFIX}/${post.slug}`)
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

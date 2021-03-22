import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Comment, CreateComment, Post, PostResponse, Series, SurveyOption} from './types';



@Injectable({providedIn: 'root'})
export class PostService {
  POST_URL = `${environment.server}/api/posts`;
  SERIES_URL = `${environment.server}/api/series`;

  totalPosts = 0;
  nextPageIndex = 1;

  // A map of Post IDs > page number
  private pageToPosts = new Map<number, number[]>();
  // A map of Post > post ID
  private loadedPosts = new Map<number, Post>();
  // A map of slug > post ID
  private postSlugs = new Map<string, number>();

  private selectedPostId?: number;

  // A map of series > series ID.
  private seriesCache = new Map<number, Series>();
  // A map of slug > series ID.
  private seriesSlugs = new Map<string, number>();
  // A map of series ID > post ID.
  private seriesToPost = new Map<number, number>();

  constructor(private readonly http: HttpClient) {
    this.seriesCache.set(-1, null);
  }

  private rememberPost(post: Post) {
    this.loadedPosts.set(post.id, post);
    this.postSlugs.set(post.slug, post.id);
  }

  fetchPage(page = this.nextPageIndex): Observable<Post[]> {
    if (this.pageToPosts.has(page)) {
      const posts = [];
      for (const postId of this.pageToPosts.get(page)) {
        posts.push(this.loadedPosts.get(postId));
      }
      return of(posts);
    } else if (page) {
      return this.http.get<PostResponse>(`${this.POST_URL}?page=${page}`)
          .pipe(map(response => {
            const postsOnThisPage: number[] = [];
            response.results.forEach(post => {
              postsOnThisPage.push(post.id);
              this.rememberPost(post);
            });
            this.pageToPosts.set(page, postsOnThisPage);
            if (response.next && page === this.nextPageIndex) {
              this.nextPageIndex++;
            } else {
              this.nextPageIndex = 0;
            }
            this.totalPosts = response.count;
            return response.results;
          }));
    } else {
      return of([]);
    }
  }

  fetchPost(slug: string): Observable<Post> {
    if (this.postSlugs.has(slug)) {
      return of(this.loadedPosts.get(this.postSlugs.get(slug)));
    } else {
      return this.http.get<Post>(`${this.POST_URL}/${slug}`).pipe(tap(post => {
        this.rememberPost(post);
      }));
    }
  }

  fetchPostById(id: number): Observable<Post> {
    return of(this.loadedPosts.get(id));
  }

  postClassName(post: Post): string {
    if (!post) {
      return '';
    }
    let className = 'post ';
    if (post && post.tags) {
      if (post.tags.includes('fiction')) {
        className += 'fiction';
      } else if (post.tags.includes('technology')) {
        className += 'technology';
      } else if (post.tags.includes('idea')) {
        className += 'idea';
      } else if (post.tags.includes('comedy')) {
        className += 'comedy';
      } else {
        className += post.tags[0];
      }
    }
    return className;
  }

  decodeString(string: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = string;
    let clean = textArea.value;
    clean = clean.replace(
        /<img src="([^"]*)" height="[0-9]+" width="[0-9]+"/gi, '<img src="$1"');
    return clean;
  }

  private rememberSeries(series: Series) {
    const id = series ? series.id : -1;
    this.seriesCache.set(id, series);
    if (series && series.posts) {
      this.seriesSlugs.set(series.slug, series.id);
      series.posts.forEach(p => {
        // So we can look up the series again for the other posts.
        this.seriesToPost.set(p.post.id, series.id);
      });
    }
  }

  fetchSeries(seriesSlug: string): Observable<Series> {
    if (this.seriesSlugs.get(seriesSlug)) {
      return of(this.seriesCache.get(this.seriesSlugs.get(seriesSlug)));
    } else {
      return this.http.get<Series>(`${this.SERIES_URL}/${seriesSlug}`)
          .pipe(tap(series => {
            this.rememberSeries(series);
          }));
    }
  }

  fetchSeriesForPost(post: Post): Observable<Series|null> {
    if (post) {
      if (this.seriesToPost.has(post.id)) {
        return of(this.seriesCache.get(this.seriesToPost.get(post.id)));
      } else {
        return this.http.get<Series|null>(`${this.POST_URL}/${post.id}/series/`)
            .pipe(tap(series => {
              this.seriesToPost.set(post.id, series ? series.id : -1);
              this.rememberSeries(series);
            }));
      }
    } else {
      return of(null);
    }
  }

  fetchComments(post: Post): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.POST_URL}/${post.id}/comments/`);
  }

  createComment(comment: CreateComment): Observable<Comment> {
    return this.http.post<Comment>(
        `${this.POST_URL}/${comment.post}/comment/`, comment);
  }

  fetchSimilarPosts(post: Post): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.POST_URL}/${post.slug}/similar/`);
  }

  fetchSurveyOptions(post: Post): Observable<SurveyOption[]> {
    return this.http.get<SurveyOption[]>(
        `${this.POST_URL}/${post.slug}/surveyoptions/`);
  }
}

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, Subject, timer} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Comment, CreateComment, Post, PostResponse, Series} from './types';



@Injectable({providedIn: 'root'})
export class PostService {
  POST_URL = `${environment.server}/api/posts`;

  totalPosts = 0;
  currentPage = '';
  nextPage? = `${this.POST_URL}/?page=1`;

  loadedPosts = new Map<number, Post>();

  private selectedPostId?: number;

  private postSubject = new Subject<Post[]|null>();
  private postSelectionSubject = new BehaviorSubject<Post|null>(null);
  private seriesSubject = new BehaviorSubject<Series>(null);

  get posts$() {
    return this.postSubject.asObservable();
  }

  get postSelection$() {
    return this.postSelectionSubject.asObservable();
  }

  get series$() {
    return this.seriesSubject.asObservable();
  }

  constructor(private readonly http: HttpClient) {}

  broadcastPosts(posts?: Array<Post>) {
    if (posts) {
      this.postSubject.next(posts);
      return;
    }

    if (this.loadedPosts.size) {
      posts = [...this.loadedPosts.values()].sort((a, b) => {
        return b.time.localeCompare(a.time);
      });
    }
    this.postSubject.next(posts);
  }

  fetchPage(): Observable<Array<Post>> {
    if (this.nextPage) {
      this.broadcastPosts();
      this.http.get<PostResponse>(this.nextPage).subscribe(response => {
        this.currentPage = this.nextPage;
        this.totalPosts = response.count;
        this.nextPage = response.next || null;
        response.results.forEach(post => {
          this.loadedPosts.set(post.id, post);
        });
        this.broadcastPosts();
      });
    }
    return this.postSubject.asObservable();
  }

  getPost(id: number): Observable<Array<Post>> {
    this.postSubject.next(null);
    combineLatest(timer(2000), this.http.get<Post>(`${this.POST_URL}/${id}/`))
        .subscribe(([x, post]) => {
          this.loadedPosts.set(post.id, post);
          this.broadcastPosts();
          setTimeout(() => {
            this.selectPost(post);
          });
        });
    return this.postSubject.asObservable();
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

  selectPost(post?: Post) {
    if ((!post && this.selectedPostId) ||
        (post && (post.id !== this.selectedPostId))) {
      this.selectedPostId = post ? post.id : undefined;
      this.postSelectionSubject.next(post);
      this.getSeries(post);
    }
  }

  private seriesCache = new Map<number, Series>();

  getSeries(post: Post): Observable<Series> {
    if (post) {
      if (!this.seriesCache.has(post.id)) {
        this.http.get<Series>(`${this.POST_URL}/${post.id}/series/`)
            .pipe(tap(series => {
              if (series && series.posts) {
                series.posts.forEach(p => {
                  this.seriesCache.set(p.post.id, series);
                  if (!this.loadedPosts.has(p.post.id)) {
                    this.loadedPosts.set(p.post.id, p.post);
                  }
                });
              }
            }))
            .subscribe(
                series => {
                  this.seriesSubject.next(series);
                },
                error => {
                    // Ignore errors.
                });
      } else {
        this.seriesSubject.next(this.seriesCache.get(post.id));
      }
    } else {
      this.seriesSubject.next(null);
    }
    return this.series$;
  }

  createComment(comment: CreateComment): Observable<Comment> {
    return this.http.post<Comment>(
        `${this.POST_URL}/${comment.post}/comment/`, comment);
  }
}

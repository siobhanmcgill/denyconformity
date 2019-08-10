import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {combineLatest, map} from 'rxjs/operators';
import data from '../data/denyconf_2012.json';

export interface JsonTable {
  type: string;
  name: string;
  database: string;
  data: any[];
}

export interface Post {
  id: number;
  time: string;
  title: string;
  text: string;
  pub: number;
  summary: string;
  href: string;
  tags: string[];
  comments: Comment[];
}

export interface Tag {
  id: number;
  tag: string;
}

export interface PostTag {
  id: number;
  tagId: number;
  postId: number;
}

export interface Comment {
  id: number;
  ip: string;
  name: string;
  postId: number;
  pub: number;
  summary: string;
  text: string;
  time: string;
}

@Injectable({providedIn: 'root'})
export class PostService {
  posts: Post[];
  tags: Tag[];
  postTags: PostTag[];
  comments: Comment[];

  constructor() {
    console.log(data);
    for (const table of (data as JsonTable[])) {
      if (table.name === 'post') {
        this.posts = table.data as Post[];
      }
      if (table.name === 'tag') {
        this.tags = table.data as Tag[];
      }
      if (table.name === 'posttag') {
        this.postTags = table.data as PostTag[];
      }
      if (table.name === 'comment') {
        this.comments = table.data as Comment[];
      }
    }
  }

  getPosts(): Observable<Post[]> {
    return of(this.posts)
        .pipe(
            combineLatest(
                this.getTags(), this.getPostTags(), this.getComments()),
            map(data => {
              const tags = new Map<number, string>();
              for (const tag of data[1]) {
                tags.set(tag.id, tag.tag);
              }
              const postTags = new Map<number, number[]>();
              for (const posttag of data[2]) {
                const pt = postTags.get(posttag.postId) || [];
                pt.push(posttag.tagId);
                postTags.set(posttag.postId, pt);
              }
              const commentMap = new Map<number, Comment[]>();
              const comments = data[3];
              for (const comment of comments) {
                const postComments = commentMap.get(comment.postId) || [];
                postComments.push(comment);
                commentMap.set(comment.postId, postComments);
              }

              const posts =
                  data[0].sort((a, b) => b.time.localeCompare(a.time));
              for (const post of posts) {
                post.tags =
                    (postTags.get(post.id) || []).map(tagId => tags.get(tagId));
                post.comments = commentMap.get(post.id) || [];
              }
              return posts;
            }));
  }

  getPost(id: number): Observable<Post> {
    return this.getPosts().pipe(map(posts => {
      return posts.filter(post => post.id === +id)[0];
    }));
  }

  getTags(): Observable<Tag[]> {
    return of(this.tags);
  }

  getPostTags(): Observable<PostTag[]> {
    return of(this.postTags);
  }

  getComments(): Observable<Comment[]> {
    return of(this.comments);
  }

  decodeString(string: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = string;
    let clean = textArea.value;
    clean = clean.replace(
        /<img src="([^"]*)" height="[0-9]+" width="[0-9]+"/gi, '<img src="$1"');
    return clean;
  }
}

import { Injectable } from '@angular/core';
import data from '../data/denyconf_2012.json';
import { Observable, of } from 'rxjs';
import {map, combineLatest} from 'rxjs/operators';

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

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[];
  tags: Tag[];
  postTags: PostTag[];

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
    }
  }

  getPosts(): Observable<Post[]> {
    return of(this.posts).pipe(
      combineLatest(this.getTags(), this.getPostTags()),
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

      const posts = data[0].sort((a, b) => b.time.localeCompare(a.time));
      for (const post of posts) {
        post.tags = (postTags.get(post.id) || []).map(tagId => tags.get(tagId));
      }
      return posts;
    }));
  }

  getTags(): Observable<Tag[]> {
    return of(this.tags);
  }

  getPostTags(): Observable<PostTag[]> {
    return of (this.postTags);
  }
}

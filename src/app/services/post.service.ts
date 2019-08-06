import { Injectable } from '@angular/core';
import data from '../data/denyconf_2012.json';
import { Observable, of } from 'rxjs';
import {map} from 'rxjs/operators';

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
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[];

  constructor() {
    console.log(data);
    for (const table of (data as JsonTable[])) {
      if (table.name === 'post') {
        this.posts = table.data as Post[];
      }
    }
  }

  getPosts(): Observable<Post[]> {
    return of(this.posts).pipe(map(posts => {
      return posts.sort((a, b) => b.time.localeCompare(a.time));
    }));
  }
}

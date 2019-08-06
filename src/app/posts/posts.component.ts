import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../services/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(
    private readonly postService: PostService
  ) {
    this.posts$ = this.postService.getPosts();
  }

  ngOnInit() {
  }

  decodeString(string: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = string;
    return textArea.value;
  }

}

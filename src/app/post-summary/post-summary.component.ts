import { Component, OnInit, Input, ElementRef, HostBinding } from '@angular/core';
import { Post, PostService } from '../services/post.service';

@Component({
  selector: 'app-post-summary',
  templateUrl: './post-summary.component.html',
  styleUrls: ['./post-summary.component.scss']
})
export class PostSummaryComponent {

  @Input() post?: Post;

  @HostBinding('className') class: string;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly postService: PostService) {}

  get top(): number {
    return this.elementRef.nativeElement.offsetTop;
  }

  get id(): number {
    return this.post.id;
  }

  decodeString(string: string): string {
    return this.postService.decodeString(string);
  }

  ngOnInit() {
    this.class = 'post ';
    if (this.post && this.post.tags) {
      this.class += this.post.tags[0];
    }
  }

}

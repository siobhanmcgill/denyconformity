import {animate, style, transition, trigger} from '@angular/animations';
import {Component, ElementRef, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {Post, PostService} from '../services/post.service';

@Component({
  selector: 'app-post-summary',
  templateUrl: './post-summary.component.html',
  styleUrls: ['./post-summary.component.scss'],
  animations: [
    trigger(
        'fade',
        [
          transition(
              'void => *',
              [
                style({opacity: 0}),
                animate('250ms ease-in-out', style({opacity: 1}))
              ]),
          transition(
              '* => void',
              [
                style({opacity: 1}),
                animate('250ms ease-in-out', style({opacity: 0}))
              ]),
        ]),
  ]
})
export class PostSummaryComponent {
  @Input() post?: Post;

  @Input() @HostBinding('class.active') active = false;
  @Input() @HostBinding('class.quiet') quiet = false;

  @HostBinding('className')
  get className(): string {
    let className = `post `;
    if (this.post && this.post.tags) {
      className += this.post.tags[0];
    }
    return className;
  }

  constructor(
      private readonly elementRef: ElementRef,
      private readonly postService: PostService) {}

  get top(): number {
    return this.elementRef.nativeElement.offsetTop;
  }

  get id(): number {
    return this.post.id;
  }

  set parallax(pos: number) {
    this.elementRef.nativeElement.style.transform = 'translateY(' + pos + 'px)';
  }

  decodeString(string: string): string {
    return this.postService.decodeString(string);
  }

  @Output() close = new EventEmitter<Post>();

  closePost(event: MouseEvent) {
    this.close.next(this.post);
    event.stopPropagation();
  }

  @Output() previous = new EventEmitter<Post>();

  previousPost(event: MouseEvent) {
    this.previous.next(this.post);
    event.stopPropagation();
  }

  @Output() next = new EventEmitter<Post>();

  nextPost(event: MouseEvent) {
    this.next.next(this.post);
    event.stopPropagation();
  }

  readPost(event: MouseEvent) {
    event.stopPropagation();
  }
}

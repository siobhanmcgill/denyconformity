import {animate, style, transition, trigger} from '@angular/animations';
import {Component, HostBinding, Input} from '@angular/core';
import {Post, PostService} from '../services/post.service';

const OUT = {
  transform: 'scaleX(.65) scaleY(.75)',
  opacity: 0,
};

const IN = {
  transform: 'scale(1)',
  opacity: 1,
};

@Component({
  selector: 'app-read-post',
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.scss'],
  animations: [
    trigger(
        'read',
        [
          transition(
              'void => *',
              [style(OUT), animate('250ms ease-in-out', style(IN))]),
          transition(
              '* => void',
              [style(IN), animate('250ms ease-in-out', style(OUT))]),
        ]),
    trigger(
        'title',
        [
          transition(
              'void => *',
              [
                style({
                  width: '0',
                }),
                animate('1s 1s ease-in-out', style({
                          width: '*',
                        }))
              ]),
        ]),
  ],
})
export class ReadPostComponent {
  @Input() post: Post;

  @Input() top: number = 0;

  @HostBinding('className') get class
  (): string {
    const classes = [];
    if (this.post && this.post.tags) {
      classes.push(this.post.tags[0]);
    }
    if (this.top === 0) {
      classes.push('unlinked');
    }
    return classes.join(' ');
  }

  @HostBinding('@read') transition = true;

  @HostBinding('style.margin-top')
  get marginTop(): string {
    if (this.top) {
      return this.top + 'px';
    } else {
      return '';
    }
  }

  constructor(private readonly postService: PostService) {}

  decodeString(string: string): string {
    return this.postService.decodeString(string);
  }
}

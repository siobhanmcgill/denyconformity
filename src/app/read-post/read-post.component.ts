import {animate, style, transition, trigger} from '@angular/animations';
import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Post, PostService} from '../services/post.service';

/*
 trigger('height', [
  transition(
      'void => *',
      [
        style(HEIGHT_OUT),
        animate('250ms ease-in-out', style(HEIGHT_IN)),
      ]),
  transition(
      '* => void',
      [
        style(HEIGHT_IN),
        animate('250ms ease-in-out', style(HEIGHT_OUT)),
      ]),
]
 */

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
export class ReadPostComponent implements OnInit {
  @Input() post: Post;

  @HostBinding('className') get class
  (): string {
    if (this.post && this.post.tags) {
      return this.post.tags[0] || '';
    } else {
      return '';
    }
  }

  @HostBinding('@read') transition = true;

  constructor(private readonly postService: PostService) {}

  ngOnInit() {}

  decodeString(string: string): string {
    return this.postService.decodeString(string);
  }
}

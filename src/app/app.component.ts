import {Location} from '@angular/common';
import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {map, throttleTime} from 'rxjs/operators';
import {PostService} from './services/post.service';
import {POST_PREFIX} from './shared/const';


const SCROLL_POS_WHEN_BG_GONE = 500;
const BG_PARALLAX_POS = SCROLL_POS_WHEN_BG_GONE * .125;
const BG_STARTING_OPACITY = .4;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChild('bgImage') bgImage: ElementRef<HTMLImageElement>;
  @ViewChild('logo') logoImage: ElementRef<HTMLImageElement>;

  constructor(
      private readonly postService: PostService,
      private readonly location: Location,
  ) {
    fromEvent(window, 'scroll')
        .pipe(throttleTime(33), map(e => {
                return window.scrollY;
              }))
        .subscribe(pos => {
          const ratio = pos / SCROLL_POS_WHEN_BG_GONE;
          const bgPos = -(BG_PARALLAX_POS * ratio);
          const opacity = BG_STARTING_OPACITY - (BG_STARTING_OPACITY * ratio);

          if (this.bgImage) {
            this.bgImage.nativeElement.style.top = bgPos + 'px';
            this.bgImage.nativeElement.style.opacity = String(opacity);
          }

          if (this.logoImage) {
            this.logoImage.nativeElement.style.top = bgPos + 'px';
          }
        });

    this.location.onUrlChange((url, state) => {
      if (url === POST_PREFIX) {
        this.postService.selectPost();
      }
    });
  }
}

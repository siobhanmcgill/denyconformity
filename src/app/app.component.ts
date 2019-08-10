import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {throttleTime} from 'rxjs/operators';
import {createToggle} from './shared/anim';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [createToggle(
      'toTop', {opacity: 0, bottom: '-4rem'}, {opacity: 1, bottom: '.5rem'})]
})
export class AppComponent {
  title = 'denyconformity';

  @ViewChild('background', {static: true})
  background: ElementRef<HTMLDivElement>;
  @ViewChildren('logo') logo: QueryList<ElementRef<HTMLImageElement>>;

  private readonly positionSubject = new Subject<number>();
  position$ = this.positionSubject.asObservable();
  position = 0;

  constructor() {
    fromEvent(window, 'scroll').pipe(throttleTime(33)).subscribe(event => {
      const scroll = window.scrollY;
      this.positionSubject.next(scroll);

      const bg = scroll * 0.04;
      this.background.nativeElement.style.top = -bg + 'px';

      let logoMult = 0;
      this.logo.forEach(logoElem => {
        const logoPos = scroll * logoMult;
        logoElem.nativeElement.style.top = -logoPos + 'px';
        logoMult += .005;
      });
    });
  }

  scrollToTop() {
    this.scrollTo(0);
  }

  scrollTo(to: number, duration?: number) {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    if (maxScroll < to) {
      duration = duration * (maxScroll / to);
      to = maxScroll;
    }

    const from = window.scrollY, difference = to - from;

    duration = duration || Math.abs(difference);

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      let reverse = c < 0, s, e;

      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      const val = -c / 2 * (t * (t - 2) - 1) + b;

      if (reverse) {
        return -val;
      } else {
        return val;
      }
    };

    let startTime = 0;

    const scrollFunc = (time: number) => {
      if (startTime === 0) {
        startTime = time;
      }
      if (window.scrollY === to || (time - startTime) >= duration) {
        window.scroll(0, to);
        return;
      }

      window.scroll(
          0, easeInOutQuad((time - startTime), from, difference, duration));
      requestAnimationFrame(scrollFunc);
    };

    requestAnimationFrame(scrollFunc);
  }
}

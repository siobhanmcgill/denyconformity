import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {throttleTime} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'denyconformity';

  @ViewChild('background', {static: true})
  background: ElementRef<HTMLDivElement>;
  @ViewChildren('logo') logo: QueryList<ElementRef<HTMLImageElement>>;

  private readonly positionSubject = new Subject<number>();
  position$ = this.positionSubject.asObservable();

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

  scrollTo(to: number, duration?: number) {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    if (maxScroll < to) {
      duration = duration * (maxScroll / to);
      to = maxScroll;
    }

    const from = window.scrollY, difference = to - from;

    duration = duration || Math.abs(difference);

    const easeInOutQuad =
        (time: number, start: number, end: number, duration: number) => {
          let reverse = false, s, e, val;
          if (start > end) {
            reverse = true;
            s = end;
            e = start;
          } else {
            s = start;
            e = end;
          }

          time /= duration / 2;
          if (time < 1) val = e / 2 * time * time + s;
          time--;
          val = -e / 2 * (time * (time - 2) - 1) + s;

          if (reverse) {
            return end - val;
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
        return;
      }

      console.log(
          from, to, duration, time - startTime,
          easeInOutQuad((time - startTime), from, to, duration));

      window.scroll(0, easeInOutQuad((time - startTime), from, to, duration));
      requestAnimationFrame(scrollFunc);
    };

    requestAnimationFrame(scrollFunc);
  }
}

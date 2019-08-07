import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {fromEvent} from 'rxjs';
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

  constructor() {
    fromEvent(window, 'scroll').pipe(throttleTime(50)).subscribe(event => {
      const scroll = window.scrollY;

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
}

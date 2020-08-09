import {Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, OnDestroy, Output} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {filter, map, throttleTime} from 'rxjs/operators';

export const SCROLL_CONTAINER_SELECTOR =
    new InjectionToken<string>('ScrollContainerSelector');

@Directive({selector: '[scrollTracker]'})
export class ScrollTrackerDirective implements OnDestroy {
  /** This is necessary for the [scrollTracker] syntax to work. */
  @Input() scrollTracker = '';

  scrollSubscription: Subscription;

  @Output() appear = new EventEmitter<boolean>();
  private appeared = false;

  constructor(
      private readonly elementRef: ElementRef,
      @Inject(SCROLL_CONTAINER_SELECTOR) private readonly scrollSelector:
          string,
  ) {
    const element: HTMLElement = this.elementRef.nativeElement;

    const container = this.scrollSelector ?
        document.querySelector(this.scrollSelector) :
        window;

    this.scrollSubscription =
        fromEvent(container, 'scroll')
            .pipe(filter(() => !this.appeared), throttleTime(100), map(e => {
                    if (this.scrollSelector) {
                      return (container as Element).scrollTop;
                    } else {
                      return (container as Window).scrollY;
                    }
                  }))
            .subscribe(pos => {
              if (pos + window.innerHeight > element.offsetTop) {
                this.appear.next(true);
                this.appeared = true;
              }
            });
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }
}

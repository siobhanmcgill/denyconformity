import {Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {filter, map, throttleTime} from 'rxjs/operators';

export const SCROLL_CONTAINER_SELECTOR =
    new InjectionToken<string>('ScrollContainerSelector');

@Directive({selector: '[scrollTracker]'})
export class ScrollTrackerDirective implements OnDestroy, OnInit {
  /** This is necessary for the [scrollTracker] syntax to work. */
  @Input() scrollTracker = '';

  scrollSubscription: Subscription;

  @Output() appear = new EventEmitter<boolean>();
  private appeared = false;

  get container() {
    return this.scrollSelector ? document.querySelector(this.scrollSelector) :
                                 window;
  }

  constructor(
      private readonly elementRef: ElementRef,
      @Inject(SCROLL_CONTAINER_SELECTOR) private readonly scrollSelector:
          string,
  ) {
    const element: HTMLElement = this.elementRef.nativeElement;

    this.scrollSubscription =
        fromEvent(this.container, 'scroll')
            .pipe(filter(() => !this.appeared), throttleTime(100), map(e => {
                    if (this.scrollSelector) {
                      return (this.container as Element).scrollTop;
                    } else {
                      return (this.container as Window).scrollY;
                    }
                  }))
            .subscribe(pos => {
              if (pos + window.innerHeight > element.offsetTop) {
                this.appear.next(true);
                this.appeared = true;
              }
            });
  }

  ngOnInit() {
    this.container.dispatchEvent(new Event('scroll'));
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }
}

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {SCROLL_CONTAINER_SELECTOR, ScrollTrackerDirective} from './scroll-tracker.directive';
import {UnsafeInnerHTMLDirective} from './unsafe-inner-html.directive';


@NgModule({
  declarations: [
    ScrollTrackerDirective,
    UnsafeInnerHTMLDirective,
  ],
  imports: [CommonModule],
  exports: [
    ScrollTrackerDirective,
    UnsafeInnerHTMLDirective,
  ],
  providers: [
    {provide: SCROLL_CONTAINER_SELECTOR, useValue: ''},
  ]
})
export class SharedModule {
}

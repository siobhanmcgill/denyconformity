import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScrollTrackerDirective} from './scroll-tracker.directive';
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
})
export class SharedModule {
}

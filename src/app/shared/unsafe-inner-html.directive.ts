import {Directive, ElementRef, Input} from '@angular/core';

/**
 * Injects the input to an element's HTML content without sanitizing it in any
 * way. This should only be used if you ABSOLUTELY TRUST the HTML being
 * injected.
 */
@Directive({selector: '[unsafeInnerHTML]'})
export class UnsafeInnerHTMLDirective {
  @Input()
  set unsafeInnerHTML(html: string) {
    if (this.elementRef) {
      this.elementRef.nativeElement.innerHTML = html;
    }
  }

  constructor(private readonly elementRef: ElementRef) {}
}

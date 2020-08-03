import {Component} from '@angular/core';
import {beforeEach, ComponentTestingModule, describe, it} from '../test/test.module.spec';
import {UnsafeInnerHTMLDirective} from './unsafe-inner-html.directive';

@Component({
  selector: 'host-component',
  template: '<div [unsafeInnerHTML]="\'<p>hey</p>\'"></div>',
})
class PostHostComponent {

}

describe('UnsafeInnerHTMLDirective', () => {
  const module = new ComponentTestingModule(PostHostComponent, {
    declarations: [
      UnsafeInnerHTMLDirective, PostHostComponent
    ],
  });

  beforeEach(() => {
    module.setup();
  });

  it('should create an instance', () => {
    expect(module.componentInstance).toBeTruthy();
  });
});

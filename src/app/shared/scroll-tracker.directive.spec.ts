import {Component} from '@angular/core';
import {beforeEach, ComponentTestingModule, describe, it} from '../test/test.module.spec';
import {ScrollTrackerDirective} from './scroll-tracker.directive';

@Component({
  selector: 'host-component',
  template: '<div [scrollTracker] (appear)="appear()"></div>',
})
class PostHostComponent {

  appear() {

  }
}

describe('ScrollTrackerDirective', () => {
  const module = new ComponentTestingModule(PostHostComponent, {
    declarations: [
      PostHostComponent, ScrollTrackerDirective
    ],
  });

  beforeEach(() => {
    module.setup();
  });

  it('should create an instance', () => {
    expect(module.componentInstance).toBeTruthy();
  });
});

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AbstractType, InjectFlags, InjectionToken, Type} from '@angular/core';
import {ComponentFixture, fakeAsync, flush, TestBed, TestBedStatic, TestModuleMetadata, tick} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {SCROLL_CONTAINER_SELECTOR} from '../shared/scroll-tracker.directive';
import {SharedModule} from '../shared/shared.module';

export function setupTestModule(modules?: {}): TestBedStatic {
  return TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule,
      NoopAnimationsModule,
      SharedModule,
    ],
    providers: [{provide: SCROLL_CONTAINER_SELECTOR, useValue: 'body'}],
    ...modules,
  });
}

const jasmineDescribe = window.describe;
const jasmineFdescribe = window.fdescribe;
export const jasmineIt = window.it;
export const jasmineFit = window.fit;
const jasmineBeforeEach = window.beforeEach;
const jasmineAfterEach = window.afterEach;

export function describe(name: string, methods: () => void) {
  jasmineDescribe(name, methods);
}

describe.only = (name: string, methods: () => void) => {
  jasmineFdescribe(name, methods);
};

export function beforeEach(fn: () => void) {
  jasmineBeforeEach(fakeAsync(fn));
};

export function afterEach(fn: () => void) {
  jasmineAfterEach(fakeAsync(fn));
};

export function it(name: string, assertion: () => void) {
  jasmineIt(name, fakeAsync(assertion));
};

it.only = (name: string, assertion: () => void) => {
  jasmineFit(name, fakeAsync(assertion));
};

export class ComponentTestingModule<T> {
  private metadata?: TestModuleMetadata;
  private componentType?: Type<T>;
  private fixture?: ComponentFixture<T>;
  private http: HttpTestingController;

  constructor(component?: Type<T>, metadata?: TestModuleMetadata) {
    this.metadata = {declarations: [component], ...metadata};
    this.componentType = component;
  }

  async setup(): Promise<any> {
    await setupTestModule(this.metadata).compileComponents();

    this.http = TestBed.inject(HttpTestingController);

    if (this.componentType) {
      this.fixture = TestBed.createComponent(this.componentType);
      this.flush();
    }
  }

  destroy() {
    this.fixture.destroy();
    document.body.removeChild(this.fixture.debugElement.nativeElement);
  }

  get componentInstance(): T {
    return this.fixture.componentInstance;
  }

  get debugElement() {
    return this.fixture.debugElement;
  }

  inject<T>(
      token: Type<T>|InjectionToken<T>|AbstractType<T>, notFoundValue?: T,
      flags?: InjectFlags): T {
    return TestBed.inject(token);
  }

  detectChanges() {
    this.fixture.detectChanges();
  }

  flush() {
    flush();
    this.fixture.detectChanges();
  }

  trigger(eventType: string, selector?: string|Element|Window, doFlush = true) {
    let element: Window|Element;
    if (!selector) {
      element = this.fixture.nativeElement;
    } else if (typeof selector === 'string') {
      element = this.fixture.nativeElement.querySelector(selector)
    } else {
      element = selector;
    }
    element.dispatchEvent(new Event(eventType));
    if (doFlush) {
      this.flush();
    }
  }

  hasEl(selector: string): boolean {
    return (this.fixture.nativeElement as HTMLElement)
               .querySelectorAll(selector)
               .length > 0;
  }

  getEl(selector: string): HTMLElement {
    return (this.fixture.nativeElement as HTMLElement).querySelector(selector);
  }

  getEls(selector: string): NodeListOf<HTMLElement> {
    return (this.fixture.nativeElement as HTMLElement)
        .querySelectorAll(selector);
  }

  expectHttp(url: string, response?: any) {
    this.http.expectOne(url).flush(response);
  }

  expectNoHttp(url: string) {
    this.http.expectNone(url);
  }

  expectHttpCancelled(url: string) {
    const req = this.http.match(url);
    expect(req.length).toBe(1);
    expect(req[0].cancelled).toBeTrue();
  }

  scroll(distance: number, doFlush = true) {
    const scroller = this.fixture.nativeElement.parentNode;
    scroller.scroll(0, distance);
    this.trigger('scroll', scroller, doFlush);
    if (doFlush) {
      tick(500);
      this.flush();
    }
  }
}

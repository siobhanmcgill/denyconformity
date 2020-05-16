import { TestBed } from '@angular/core/testing';

import { MarkdownServiceService } from './markdown-service.service';

describe('MarkdownServiceService', () => {
  let service: MarkdownServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkdownServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

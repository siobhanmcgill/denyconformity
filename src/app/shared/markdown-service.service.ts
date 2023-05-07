import {Injectable} from '@angular/core';
import {Converter} from 'showdown';

import {PostService} from '../services/post.service';
import {Post} from '../services/types';

@Injectable({providedIn: 'root'})
export class MarkdownServiceService {
  private mdConverter: Converter;

  constructor(private readonly postService: PostService) {
    this.mdConverter = new Converter();

    this.mdConverter.setOption('openLinksInNewWindow', 'true');
    this.mdConverter.setOption('simplifiedAutoLink', 'true');
    this.mdConverter.setOption('excludeTrailingPunctuationFromURLs', 'true');
  }

  convert(text: string): string {
    return this.mdConverter.makeHtml(text);
  }

  renderPostText(post?: Post, field: 'text'|'summary' = 'text'): string {
    if (!post) {
      return '';
    }
    const text = field === 'text' ? post.text : post.summary;
    if (post.markdown) {
      return this.convert(text);
    } else {
      return this.postService.decodeString(text);
    }
  }
}

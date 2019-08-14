import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Post, PostService} from '../services/post.service';

@Component({
  selector: 'app-post-book',
  templateUrl: './post-book.component.html',
  styleUrls: ['./post-book.component.scss']
})
export class PostBookComponent implements AfterViewInit {
  @Input() post?: Post;

  @ViewChild('layoutPage', {static: false})
  layoutPage: ElementRef<HTMLDivElement>;
  @ViewChild('content', {static: false}) content: ElementRef<HTMLDivElement>;

  pageContent: HTMLElement[] = [];

  constructor(private readonly postService: PostService) {}

  get viewableArea(): HTMLDivElement {
    return this.layoutPage.nativeElement.querySelector('.viewable-area');
  }

  get viewableHeight(): number {
    return this.layoutPage.nativeElement.querySelector('.viewable-area')
        .clientHeight;
  }

  ngAfterViewInit() {
    document.body.classList.add('disable-scroll');

    console.log('post', this.post);

    const postContent = document.createElement('div');
    postContent.innerHTML = `
    <h2>${this.post.title}</h2>
    <div class="content">
    ${this.postService.decodeString(this.post.text)}
    </div>`;

    this.loopThroughChildNodes(postContent, this.viewableArea);

    console.log('pages', this.pageContent);

    // const text = this.decodeString(this.post.text);
    // const bits = text.split(/[<>]/);
    // const tags = new Set(['p', 'em', 'strong']);

    // let activeTag: HTMLElement = document.createElement('div');
    // activeTag.className = 'content';
    // for (const bit of bits) {
    //   console.log(bit);
    //   if (tags.has(bit)) {
    //     const newTag = document.createElement(bit);
    //     activeTag.append(newTag);
    //     activeTag = newTag;
    //   } else if (bit.charAt(0) === '/' && tags.has(bit.substr(1))) {
    //     activeTag = activeTag.parentElement;
    //   } else {
    //     activeTag.append(bit);
    //   }
    // }
    // console.log(activeTag);
  }

  loopThroughChildNodes(parent: HTMLElement, target: HTMLElement) {
    parent.childNodes.forEach(child => {
      if (child.nodeValue && !child.nodeValue.trim()) {
        return;
      }
      if (child.nodeType === Node.TEXT_NODE) {
        const words = child.textContent.split(' ');
        let nextWord;
        while (target.offsetTop + target.offsetHeight <= this.viewableHeight &&
               words.length) {
          console.log(target.offsetTop + target.offsetHeight);
          nextWord = words.shift();
          target.innerText += nextWord + ' ';
        }
        if (target.offsetTop + target.offsetHeight > this.viewableHeight) {
          words.unshift(nextWord);
        }
        this.pageContent.push(this.viewableArea.cloneNode(true) as HTMLElement);
        this.viewableArea.innerHTML = '';

        // const next = target.cloneNode(false) as HTMLElement;
        // const newParent = document.createElement('textNode');
        // newParent.innerHTML = words.join(' ');
        // this.loopThroughChildNodes(newParent, next);

      } else {
        const newChild = child.cloneNode(true) as HTMLElement;
        target.append(newChild);

        if (newChild.offsetTop + newChild.offsetHeight > this.viewableHeight) {
          if (newChild.hasChildNodes) {
            const clone = newChild.cloneNode(true);
            newChild.innerHTML = '';
            this.loopThroughChildNodes(clone as HTMLElement, newChild);
          } else {
            newChild.remove();
            this.pageContent.push(
                this.viewableArea.cloneNode(true) as HTMLElement);
            this.viewableArea.innerHTML = '';
            this.viewableArea.appendChild(newChild);
          }
        }
      }
    });
  }

  decodeString(string: string): string {
    return this.postService.decodeString(string);
  }
}

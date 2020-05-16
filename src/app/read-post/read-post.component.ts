import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../services/types';
import {MarkdownServiceService} from '../shared/markdown-service.service';


@Component({
  selector: 'app-read-post',
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.scss']
})
export class ReadPostComponent {
  @Input() post?: Post;

  @ViewChild('layoutPage', {static: false})
  layoutPage: ElementRef<HTMLDivElement>;
  @ViewChild('content', {static: false}) content: ElementRef<HTMLDivElement>;

  pageContent: HTMLElement[] = [];
  selectedPageIndex = -1;

  currentIterationTarget: HTMLElement;

  @Output('close') closeEvent = new EventEmitter();

  constructor(
      private readonly postService: PostService,
      private readonly changeDetectorRef: ChangeDetectorRef,
      private readonly markdownService: MarkdownServiceService,
  ) {}

  get viewableArea(): HTMLDivElement {
    return this.layoutPage.nativeElement.querySelector('.viewable-area');
  }

  get viewableHeight(): number {
    return this.viewableArea.clientHeight;
  }

  ngAfterViewInit() {
    document.body.classList.add('disable-scroll');

    const postContent = document.createElement('div');
    postContent.innerHTML = `
    <h2>${this.post.title}</h2>
    <div class="content book-layout-top">
    ${this.renderText(this.post)}
    </div>`;

    this.currentIterationTarget = this.viewableArea;
    this.loopThroughChildNodes(postContent);

    this.pageContent.push(this.viewableArea.cloneNode(true) as HTMLElement);

    console.log('pages', this.pageContent);

    this.selectedPageIndex = 0;

    this.changeDetectorRef.detectChanges();
  }

  renderText(post: Post): string {
    if (post.markdown) {
      return this.markdownService.convert(post.text);
    } else {
      return this.postService.decodeString(post.text);
    }
  }

  close() {
    document.body.classList.remove('disable-scroll');
    this.closeEvent.next();
  }

  prevPage() {
    if (this.selectedPageIndex > 0) {
      this.selectedPageIndex--;
    }
  }

  nextPage() {
    if (this.selectedPageIndex < this.pageContent.length - 1) {
      this.selectedPageIndex++;
    }
  }

  isCurrentTargetOut(): boolean {
    return this.viewableArea.scrollHeight > this.viewableHeight + 10;
  }

  loopThroughChildNodes(source: HTMLElement) {
    console.log('source', source);
    source.childNodes.forEach(child => {
      if (child.nodeValue && !child.nodeValue.trim()) {
        return;
      }
      console.log(
          'child', child.nodeType, 'target',
          this.currentIterationTarget.tagName,
          this.currentIterationTarget.className);
      if (child.nodeType === Node.TEXT_NODE) {
        const words = child.textContent.split(' ');
        const wordsToUse = [];
        console.log(
            'injecting', words.length, 'words to',
            this.currentIterationTarget.tagName,
            this.currentIterationTarget.className);
        while (!this.isCurrentTargetOut() && words.length) {
          wordsToUse.push(words.shift());
          this.currentIterationTarget.innerHTML = wordsToUse.join(' ');
        }
        if (this.isCurrentTargetOut() && wordsToUse.length) {
          words.unshift(wordsToUse.pop());
          this.currentIterationTarget.innerHTML = wordsToUse.join(' ');
        }

        if (words.length) {
          // The text overflows the page.
          let nextParent =
              this.currentIterationTarget.cloneNode(false) as HTMLElement;
          nextParent.innerHTML = words.join(' ');

          console.log(
              'did not fit to', this.currentIterationTarget.outerHTML,
              'clone:', nextParent,
              'parent:', this.currentIterationTarget.parentElement.className);

          if (!wordsToUse.length) {
            console.log('at all');
            // const toRemove = this.currentIterationTarget;
            this.currentIterationTarget =
                this.currentIterationTarget.parentElement;
            // toRemove.remove();
          } else {
            console.log('words:', wordsToUse.length, words.length);
            this.currentIterationTarget =
                this.currentIterationTarget.parentElement;
          }

          let count = 0;

          console.log(
              'new target', this.currentIterationTarget.tagName,
              this.currentIterationTarget.className);

          while (!nextParent.classList.contains('book-layout-top') &&
                 !nextParent.classList.contains('viewable-area') &&
                 count < 20) {
            const newNextParent =
                this.currentIterationTarget.cloneNode(false) as HTMLElement;
            newNextParent.appendChild(nextParent);
            nextParent = newNextParent;
            count++;
            this.currentIterationTarget =
                this.currentIterationTarget.parentElement;
          }

          this.pageContent.push(
              this.viewableArea.cloneNode(true) as HTMLElement);

          this.viewableArea.innerHTML = '';
          this.currentIterationTarget = document.createElement('div');
          this.currentIterationTarget.className = 'content book-layout-top';
          this.viewableArea.appendChild(this.currentIterationTarget);

          console.log(
              'looping through', nextParent,
              'target:', this.currentIterationTarget.tagName,
              this.currentIterationTarget.className);
          if (nextParent) {
            this.loopThroughChildNodes(nextParent);
          }
        } else {
          console.log('did fit!', this.currentIterationTarget.tagName);
          this.currentIterationTarget =
              this.currentIterationTarget.parentElement;
        }
      } else {
        const newChild = child.cloneNode(true) as HTMLElement;
        this.currentIterationTarget.append(newChild);

        console.log(
            'child is tag', newChild.tagName, newChild.className, 'is out?',
            this.isCurrentTargetOut(), 'target',
            this.currentIterationTarget.tagName,
            this.currentIterationTarget.className);

        if (this.isCurrentTargetOut()) {
          if (newChild.hasChildNodes) {
            const clone = newChild.cloneNode(true);
            newChild.innerHTML = '';
            this.currentIterationTarget = newChild;
            this.loopThroughChildNodes(clone as HTMLElement);
            // this.currentIterationTarget =
            // this.currentIterationTarget.parentElement;
          } else {
            newChild.remove();
            this.pageContent.push(
                this.viewableArea.cloneNode(true) as HTMLElement);
            this.viewableArea.innerHTML = '';
            this.currentIterationTarget = this.viewableArea;
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

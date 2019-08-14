import {AfterViewInit, Component, ElementRef, Input, ViewChild, ChangeDetectorRef} from '@angular/core';
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
  selectedPageIndex = -1;

  currentIterationTarget: HTMLElement;

  constructor(
    private readonly postService: PostService,
    private readonly changeDetectorRef: ChangeDetectorRef,
              ) {}

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
    <div class="content book-layout-top">
    ${this.postService.decodeString(this.post.text)}
    </div>`;

    this.currentIterationTarget = this.viewableArea;
    this.loopThroughChildNodes(postContent);

    console.log('pages', this.pageContent);

    this.selectedPageIndex = 0;

    this.changeDetectorRef.detectChanges();
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
    return this.currentIterationTarget.offsetTop + this.currentIterationTarget.offsetHeight > this.viewableHeight
  }

  loopThroughChildNodes(source: HTMLElement) {
    console.log('source', source, this.currentIterationTarget);
    source.childNodes.forEach(child => {
      if (child.nodeValue && !child.nodeValue.trim()) {
        return;
      }
      console.log('child', child, child.nodeType === Node.TEXT_NODE ? 'TEXT' : 'TAG');
      if (child.nodeType === Node.TEXT_NODE) {
        const words = child.textContent.split(' ');
        const wordsToUse = []
        while (!this.isCurrentTargetOut() && words.length) {
          wordsToUse.push(words.shift());
          this.currentIterationTarget.innerHTML = wordsToUse.join(' ');
        }
        if (this.isCurrentTargetOut()) {
          words.unshift(wordsToUse.pop());
          this.currentIterationTarget.innerHTML = wordsToUse.join(' ');
        }

        let nextParent;
        if (words.length) {
          nextParent = this.currentIterationTarget.cloneNode(false) as HTMLElement;
          nextParent.innerHTML = words.join(' ');
        } else {
          nextParent = this.currentIterationTarget.parentElement.cloneNode(false);
          this.currentIterationTarget = this.currentIterationTarget.parentElement;
        }

        let count = 0;

        while (!nextParent.classList.contains('book-layout-top') &&
          !nextParent.classList.contains('viewable-area') && count < 20) {
          this.currentIterationTarget = this.currentIterationTarget.parentElement;
          const newNextParent = this.currentIterationTarget.cloneNode(false) as HTMLElement;
          newNextParent.appendChild(nextParent);
          nextParent = newNextParent;
          count++;
        }

        this.pageContent.push(this.viewableArea.cloneNode(true) as HTMLElement);

        this.viewableArea.innerHTML = '';
        this.currentIterationTarget = this.viewableArea;
        
        if (nextParent) {
          this.loopThroughChildNodes(nextParent);
        }

      } else {
        const newChild = child.cloneNode(true) as HTMLElement;
        this.currentIterationTarget.append(newChild)

        if (this.isCurrentTargetOut()) {
          if (newChild.hasChildNodes) {
            const clone = newChild.cloneNode(true);
            newChild.innerHTML = '';
            this.currentIterationTarget = newChild;
            this.loopThroughChildNodes(clone as HTMLElement);
            // this.currentIterationTarget = this.currentIterationTarget.parentElement;
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

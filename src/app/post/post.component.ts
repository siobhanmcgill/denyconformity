import {Location} from '@angular/common';
import {ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {PostService} from '../services/post.service';
import {CreateComment, Post} from '../services/types';
import {createToggle} from '../shared/anim';
import {MarkdownServiceService} from '../shared/markdown-service.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [
    createToggle(
        'summary', {'height': '0', 'opacity': '0'},
        {'height': '*', 'opacity': '1'}, 300),
    createToggle(
        'wrapper', {'height': '0', 'margin': '0', 'opacity': '0'},
        {'height': '*', 'margin': '*', 'opacity': '1'}, 500),
  ]
})
export class PostComponent implements OnInit, OnDestroy {
  @ViewChild('commentText') commentText: ElementRef<HTMLTextAreaElement>;

  @Input() post: Post;

  @Output() read = new EventEmitter<Post>();

  selected = false;
  anotherPostSelected = false;
  showComments = false;

  postSelectionSubscription: Subscription;

  private goBack = false;

  @HostBinding('className')
  get className(): string {
    return this.postService.postClassName(this.post);
  }

  commentFormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'text': new FormControl('', Validators.required)
  });

  constructor(
      private readonly postService: PostService,
      private readonly changeDetectorRef: ChangeDetectorRef,
      private readonly location: Location,
      private readonly markdownService: MarkdownServiceService,
  ) {
    this.commentFormGroup.controls.text.valueChanges.subscribe(text => {
      this.commentText.nativeElement.style.height = 'auto';
      this.commentText.nativeElement.style.height =
          this.commentText.nativeElement.scrollHeight + 'px';
    });
  }

  ngOnInit(): void {
    this.postSelectionSubscription =
        this.postService.postSelection$.subscribe(post => {
          if (post && post.id === this.post.id) {
            this.selected = true;
            this.anotherPostSelected = false;
          } else if (post) {
            this.selected = false;
            this.anotherPostSelected = true;
          } else {
            this.anotherPostSelected = false;
            this.selected = false;
          }
          this.showComments = false;
          this.changeDetectorRef.detectChanges();
        });
  }

  ngOnDestroy(): void {
    this.postSelectionSubscription.unsubscribe();
  }

  @HostListener('click')
  onClick() {
    if (!this.selected) {
      this.location.go('/p/' + this.post.id);
      this.postService.selectPost(this.post);
      this.goBack = true;
    }
  }

  renderSummary(post: Post): string {
    console.log('post?', post);
    if (post.markdown) {
      return this.renderMarkdown(post.summary);
    } else {
      return this.postService.decodeString(post.summary);
    }
  }

  renderText(post: Post): string {
    if (post.markdown) {
      return this.renderMarkdown(post.text);
    } else {
      return this.postService.decodeString(post.text);
    }
  }

  close(e: MouseEvent) {
    e.stopPropagation();
    if (this.goBack) {
      this.location.back();
    } else {
      this.location.go('/p');
    }
  }

  readPost(e: MouseEvent) {
    e.stopPropagation();
    console.log('read post!', this.post);
    this.read.next(this.post);
  }

  submitComment() {
    const comment: CreateComment = {
      name: this.commentFormGroup.controls.name.value,
      text: this.commentFormGroup.controls.text.value,
      post: this.post.id,
    };
    const index = this.post.comments.push(
        {...comment, time: (new Date()).toISOString(), id: -1});

    this.commentFormGroup.reset();

    this.postService.createComment(comment).subscribe(createdComment => {
      this.post.comments[index - 1].id = createdComment.id;
    });
  }

  renderMarkdown(str: string): string {
    return this.markdownService.convert(str);
  }

  commentsAppear() {
    // A wild comments appeared!
    this.showComments = true;
  }
}

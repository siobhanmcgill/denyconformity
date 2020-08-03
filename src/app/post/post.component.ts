import {Location} from '@angular/common';
import {ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {PostService} from '../services/post.service';
import {Comment, CreateComment, Post} from '../services/types';
import {createToggle} from '../shared/anim';
import {POST_PREFIX} from '../shared/const';
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
  @Input() index: number;

  @Output() read = new EventEmitter<Post>();

  selected = false;
  anotherPostSelected = false;
  thisPostIsSimilar = false;
  showComments = false;

  comments$: Observable<Comment[]>;
  similarPosts$: Observable<Post[]>;

  createdComment?: Comment;

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
        this.thisPostIsSimilar = this.postService.isThisPostSimilar(this.post);
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
      this.location.go(POST_PREFIX + '/' + this.post.slug);
      this.postService.selectPost(this.post);
      this.goBack = true;
    }
  }

  renderSummary(post?: Post): string {
    if (!post) {
      return '';
    }
    if (post.markdown) {
      return this.renderMarkdown(post.summary);
    } else {
      return this.postService.decodeString(post.summary);
    }
  }

  renderText(post?: Post): string {
    if (!post) {
      return '';
    }
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
      this.location.go(POST_PREFIX);
    }
  }

  readPost(e: MouseEvent) {
    e.stopPropagation();
    this.read.next(this.post);
  }

  submitComment() {
    const comment: CreateComment = {
      name: this.commentFormGroup.controls.name.value,
      text: this.commentFormGroup.controls.text.value,
      post: this.post.id,
    };
    this.createdComment = {
      ...comment,
      time: (new Date()).toISOString(),
      id: -1
    };

    this.commentFormGroup.reset();

    this.postService.createComment(comment).subscribe(createdComment => {
      this.createdComment = createdComment;
    });
  }

  renderMarkdown(str: string): string {
    return this.markdownService.convert(str);
  }

  commentsAppear() {
    // A wild comments appeared!
    this.showComments = true;
    this.comments$ = this.postService.getComments(this.post);
  }

  loadSimilarPosts() {
    // this.similarPosts$ = this.postService.getSimilars(this.post);
    this.postService.loadSimilarPosts(this.post);
  }

  openSimilar(event: Event, post: Post) {
    // Deselect the current post.
    this.postService.selectPost();
    // Show the new post, to make sure it renders.
    this.postService.broadcastPosts([post]);
    setTimeout(() => {
      // Open the new post.
      this.postService.selectPost(post);
    }, 1000);
    event.stopPropagation();
  }
}

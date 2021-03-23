import {Location} from '@angular/common';
import {Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {PostListStateService} from '../services/post-list-state.service';
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
    createToggle({
      name: 'summary',
      outStyle: {'height': '0', 'opacity': '0'},
      inStyle: {'height': '*', 'opacity': '1'},
      durationMs: 300,
    }),
    createToggle({
      name: 'wrapper',
      outStyle: {'height': '0', 'margin': '0', 'opacity': '0'},
      inStyle: {'height': '*', 'margin': '*', 'opacity': '1'},
      durationMs: 500
    }),
  ]
})
export class PostComponent {
  @ViewChild('commentText') commentText: ElementRef<HTMLTextAreaElement>;

  @Input() post: Post;
  @Input() index: number;

  @Output() read = new EventEmitter<Post>();

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

  get selected(): boolean {
    return this.postListService.selectedPostId === this.post.id;
  }

  commentFormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'text': new FormControl('', Validators.required)
  });

  constructor(
      private readonly postService: PostService,
      private readonly postListService: PostListStateService,
      private readonly location: Location,
      private readonly markdownService: MarkdownServiceService,
  ) {
    this.commentFormGroup.controls.text.valueChanges.subscribe(text => {
      this.commentText.nativeElement.style.height = 'auto';
      this.commentText.nativeElement.style.height =
          this.commentText.nativeElement.scrollHeight + 'px';
    });
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

  goHome(e: MouseEvent) {
    e.stopPropagation();
    this.location.go(POST_PREFIX);
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
    this.comments$ = this.postService.fetchComments(this.post);
    this.loadSimilarPosts();
  }

  loadSimilarPosts() {
    this.postListService.loadSimilarPosts(this.post);
  }
}

import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {PostService} from '../services/post.service';
import {Post, SurveyOption} from '../services/types';
import {createToggle} from '../shared/anim';

const VOTE_LS_KEY = 'vote_for_post_';

@Component({
  selector: 'app-post-survey',
  templateUrl: './post-survey.component.html',
  styleUrls: ['./post-survey.component.scss'],
  animations: [
    createToggle({
      name: 'results',
      outStyle: {width: 0},
      inStyle: {width: '{{width}}'},
      params: {width: '100%'},
      durationMs: 1000,
      delayMs: 500
    }),
    createToggle({
      name: 'option',
      outStyle: {
        'padding-top': 0,
        'padding-bottom': 0,
        height: 0,
        overflow: 'hidden',
      },
    })
  ]
})
export class PostSurveyComponent implements OnInit {
  CUSTOM_OPTION_ID = '-1';

  @Input() post: Post;

  options$?: Observable<SurveyOption[]>;

  selectedOptionId = '';

  showResults = false;
  totalVotes = 0;

  addOptionFormGroup = new FormGroup({
    'text':
        new FormControl('', [Validators.required, Validators.maxLength(280)]),
    'name': new FormControl('', Validators.required),
  });

  constructor(
      private readonly service: PostService,
      private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.addOptionFormGroup.valueChanges.subscribe(value => {
      if (value['text']) {
        this.selectedOptionId = this.CUSTOM_OPTION_ID;
      }
    });
  }

  get isSurveyOpen(): boolean {
    return !this.post.survey_expires ||
        (new Date(this.post.survey_expires)) > new Date();
  }

  get prompt(): string {
    if (this.isSurveyOpen) {
      return this.post.survey_open_prompt ||
          'Please pick which answer you like best.';
    } else {
      return this.post.survey_closed_prompt ||
          'Voting on this post is closed. Here are the results.';
    }
  }

  get isSubmitValid(): boolean {
    return (this.selectedOptionId !== '' &&
            this.selectedOptionId !== this.CUSTOM_OPTION_ID) ||
        (this.selectedOptionId === this.CUSTOM_OPTION_ID &&
         this.addOptionFormGroup.valid);
  }

  get voteLocalStorageKey(): string {
    return `${VOTE_LS_KEY}${this.post.id}`;
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    if (!this.isSurveyOpen) {
      this.showResults = true;
    }
    this.options$ =
        this.service.fetchSurveyOptions(this.post).pipe(tap(options => {
          console.log('options', options);
          this.totalVotes = 0;
          for (const option of options) {
            if (option.custom) {
              // Count custom options as votes.
              this.totalVotes++;
            }
            this.totalVotes += option.votes.length;
          }
          console.log('total votes:', this.totalVotes);

          const existingVote =
              JSON.parse(localStorage.getItem(this.voteLocalStorageKey));
          if (existingVote) {
            this.showResults = true;
            if (existingVote['survey_option']) {
              // It's a standard vote for an option.
              this.selectedOptionId = existingVote['survey_option'];
            } else if (existingVote['post']) {
              // It's a custom option.
              this.selectedOptionId = existingVote['id'];
            }
          }
        }));
    this.changeDetectorRef.detectChanges();
  }

  optionVoteCount(option: SurveyOption): number {
    return (option.custom ? 1 : 0) + option.votes.length;
  }

  select(option: SurveyOption) {
    if (this.showResults) {
      return;
    }
    this.addOptionFormGroup.reset();
    this.selectedOptionId = option.id;
  }

  submit() {
    if (!this.selectedOptionId) {
      return;
    }
    this.options$ = null;
    // If selectedOptionId is -1, we're creating a new option.
    if (this.selectedOptionId === this.CUSTOM_OPTION_ID &&
        this.addOptionFormGroup.valid) {
      this.service.createSurveyOption(this.post, this.addOptionFormGroup.value)
          .subscribe(newOption => {
            localStorage.setItem(
                this.voteLocalStorageKey, JSON.stringify(newOption));
            this.showResults = true;
            this.init();
          });
    } else if (this.selectedOptionId) {
      this.options$ = null;
      this.service
          .createSurveyVote(
              this.post, this.selectedOptionId, {text: '', name: ''})
          .subscribe(newVote => {
            localStorage.setItem(
                this.voteLocalStorageKey, JSON.stringify(newVote));
            this.showResults = true;
            this.init();
          });
    }
  }
}

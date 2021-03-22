import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {PostService} from '../services/post.service';
import {Post, SurveyOption} from '../services/types';

@Component({
  selector: 'app-post-survey',
  templateUrl: './post-survey.component.html',
  styleUrls: ['./post-survey.component.scss']
})
export class PostSurveyComponent implements OnInit {
  CUSTOM_OPTION_ID = '-1';

  @Input() post: Post;

  options$?: Observable<SurveyOption[]>;

  selectedOptionId = '';

  addOptionFormGroup = new FormGroup({
    'text': new FormControl('', Validators.required),
    'name': new FormControl('', Validators.required),
  });

  constructor(
      private readonly service: PostService,
  ) {
    this.addOptionFormGroup.valueChanges.subscribe(value => {
      if (value['text']) {
        this.selectedOptionId = this.CUSTOM_OPTION_ID;
      }
    });
  }

  get isSurveyOpen(): boolean {
    return !this.post.survey_expires ||
        (new Date(this.post.survey_expires)) < new Date();
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

  ngOnInit(): void {
    this.options$ = this.service.fetchSurveyOptions(this.post);
  }

  select(option: SurveyOption) {
    this.addOptionFormGroup.reset();
    this.selectedOptionId = option.id;
  }

  submit() {}
}

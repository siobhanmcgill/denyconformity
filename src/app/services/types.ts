
export interface PostResponse {
  count: number;
  next: string;
  previous: string;
  results: Array<Post>;
}

export interface Post {
  id: number;
  summary: string;
  tags: string[];
  text: string;
  time: string;
  title: string;
  markdown: boolean;
  slug: string;
  image: string;
  survey_description: string;
  survey_expires: string;
  survey_open_prompt: string;
  survey_closed_prompt: string;
  survey_allows_custom_answers: boolean;
}

export interface Comment {
  id: number;
  name: string;
  text: string;
  time: string;
}

export interface CreateComment {
  name: string;
  post: number;
  text: string;
}

export interface Series {
  id: number;
  name: string;
  description: string;
  posts: Array<SeriesPost>;
  time: string;
  slug: string;
  icon: string;
}

export interface SeriesPost {
  label: string;
  srt: number;
  post: Post;
}

export interface SurveyVote {
  id: string;
  time: string;
  text: string;
  name: string;
}

export interface SurveyOption {
  id: string;
  post: string;
  text: string;
  name: string;
  time: string;
  votes: Array<SurveyVote>;
}

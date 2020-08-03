
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
  style: string;
  description: string;
  posts: Array<SeriesPost>;
}

export interface SeriesPost {
  label: string;
  srt: number;
  post: Post;
}

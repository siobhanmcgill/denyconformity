
export interface PostResponse {
  count: number;
  next_page: number;
  posts: Array<Post>;
}

export interface Post {
  id: number;
  pub: boolean;
  summary: string;
  tags: string[];
  text: string;
  time: string;
  title: string;
  comments: Array<Comment>;
}

export interface Comment {
  id: number;
  name: string;
  post: number;
  pub: boolean;
  summary: string;
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
  posts: Array<Post>;
}

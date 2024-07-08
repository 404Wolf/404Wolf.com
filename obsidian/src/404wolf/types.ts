export interface Resource {
  id: string;
  title: string;
  filename: string;
  url: string;
  type: string;
  postId: string;
  description: string | null;
}
export interface Markdown {
  id: string;
  data: string;
}
export interface Post {
  id: string;
  title: string;
  description: string;
  markdown: Markdown;
  covers: string[];
  type: string;
  date: string;
  tags: string[];
  createdAt: string;
  editedAt: string;
  notes: string;
  resources: Array<Resource>;
}


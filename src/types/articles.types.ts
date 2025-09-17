export type DetailArticles = {
  id: number;
  title: string;
  slug: string;
  image: string;
  content: string;
  created_at: string;
  prev: string | null;
  next: string | null;
};

export type Articles = {
  id: number;
  title: string;
  slug: string;
  image: string;
  created_at: string;
  updated_at: string;
};

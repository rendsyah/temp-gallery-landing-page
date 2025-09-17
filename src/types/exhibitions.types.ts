export type DetailExhibitions = {
  id: number;
  name: string;
  image: string;
  desc: string;
  start_date: string;
  end_date: string;
  prev: string | null;
  next: string | null;
};

export type Exhibitions = {
  id: number;
  name: string;
  slug: string;
  image: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
};

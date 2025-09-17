type Image = {
  id: number;
  image: string;
};

export type DetailArtworks = {
  id: number;
  artist_name: string;
  category_name: string;
  name: string;
  year: number;
  width: number;
  length: number;
  unit: string;
  price: number;
  desc: string;
  images: Image[];
  prev: string | null;
  next: string | null;
};

export type Artworks = {
  id: number;
  artist_name: string;
  name: string;
  slug: string;
  image: string;
  year: number;
  created_at: string;
  updated_at: string;
};

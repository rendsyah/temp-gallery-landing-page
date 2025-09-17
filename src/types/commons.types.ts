export type Nullable<T> = T | undefined;

export type Context<T> = {
  params: Promise<T>;
};

export type Options = {
  id: string | number;
  name: string;
};

export type Meta = {
  page: number;
  limit: number;
  getMore: boolean;
};

export type Params = {
  slug: string;
};

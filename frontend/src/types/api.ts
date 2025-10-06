export type Category = {
  id: number;
  titulo: string;
};

export type User = {
  name?: string;
  email: string;
  password: string;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: string;
  updated_at?: string | null;
  author: {
    id: number;
    name: string;
  };
  categories: [
    {
      id: number;
      name: string;
    }
  ];
};

export type Resource<T> = {
  data: T;
};

export type CreatingPost = {
  title: string;
  content: string;
  published: boolean;
  categorySlug: string;
};

export type EditingPost = CreatingPost & {
  id: number;
};

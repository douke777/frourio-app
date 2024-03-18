export const post = {
  id: 5,
  title: 'ホタテ',
  content: '食べたい',
  published: true,
  authorId: 1,
  categorySlug: 'programming',
  createdAt: '2024-02-11T11:57:24.444Z',
  updatedAt: '2024-02-11T11:57:24.444Z',
  user: {
    id: 1,
    email: 'admin@gmail.com',
    image: '',
    createdAt: '2024-02-11T11:57:24.444Z',
    updatedAt: '2024-02-11T11:57:24.444Z',
  },
};

export const posts = [
  {
    id: 5,
    title: 'ホタテ',
    content: '食べたい',
    published: true,
    authorId: 1,
    categorySlug: 'programming',
    createdAt: '2024-02-11T11:57:24.444Z',
    updatedAt: '2024-02-11T11:57:24.444Z',
    user: {
      id: 1,
      email: 'admin@gmail.com',
      image: '',
      createdAt: '2024-02-11T11:57:24.444Z',
      updatedAt: '2024-02-11T11:57:24.444Z',
    },
  },
  {
    id: 6,
    title: 'ホタテ2',
    content: '食べたい',
    published: true,
    authorId: 1,
    categorySlug: 'programming',
    createdAt: '2024-02-28T03:59:26.108Z',
    updatedAt: '2024-02-28T03:59:26.108Z',
    user: {
      id: 1,
      email: 'admin@gmail.com',
      image: '',
      createdAt: '2024-02-11T11:57:24.444Z',
      updatedAt: '2024-02-11T11:57:24.444Z',
    },
  },
];

export const user = {
  id: 1,
  name: 'user',
  email: 'admin@gmail.com',
  image: '',
  profile: {},
  posts,
  createdAt: '2024-02-11T11:57:24.444Z',
  updatedAt: '2024-02-11T11:57:24.444Z',
};

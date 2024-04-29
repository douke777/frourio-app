import { useEffect, useState, useCallback, memo, FC } from 'react';

import { ConstMessage } from '@/components/Element/Const';

import { PostWithDetails } from '$/types';

import { PostList } from './List';
import { Pagination } from './Pagination';

type Props = {
  posts: PostWithDetails[];
};
export const PaginatedPostList: FC<Props> = memo(({ posts }) => {
  // TODO: search, category/[slug]で修正
  // const router = useRouter();
  // const { asPath } = useRouter();
  const [offset, setOffset] = useState<number>(0);
  const [slice, setSlice] = useState<Array<PostWithDetails>>([]);
  const [perPage] = useState<number>(6);
  const [pageCount, setPageCount] = useState<number>(0);

  const handlePageClick = useCallback(
    (e: { selected: number }): void => {
      const selectedPage = e.selected;
      setOffset(selectedPage * perPage);
    },
    [perPage],
  );

  useEffect(() => {
    const postData = posts.slice(offset, offset + perPage);
    if (postData.length) {
      setSlice(postData);
      setPageCount(Math.ceil(posts.length / perPage));
    }
  }, [offset, perPage, posts]);
  // }, [offset, router.query, perPage, asPath, posts]);

  let content;
  if (posts.length) {
    content = (
      <div className='mb-8'>
        <PostList posts={slice} className='mr-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mr-0' />
        <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
      </div>
    );
  } else {
    content = <ConstMessage message='No posts yet' />;
  }

  return <div className='ml-2 mt-4 lg:ml-0'>{content}</div>;
});

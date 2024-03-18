import { useEffect, useState, useCallback, memo, FC } from 'react';

import { ConstMessage } from '@/components/Element/Const';

import { PostList } from './List';
import { Pagination } from './Pagination';
import { usePosts } from '../api/getPosts';
import { Post } from '../types';

export const PaginatedPostList: FC = memo(() => {
  const { data: posts } = usePosts();

  // const router = useRouter();
  // const { asPath } = useRouter();
  const [offset, setOffset] = useState<number>(0);
  const [slice, setSlice] = useState<Array<Post>>([]);
  const [perPage] = useState<number>(6);
  const [pageCount, setPageCount] = useState<number>(0);

  const handlePageClick = useCallback(
    (e): void => {
      const selectedPage = e.selected;
      setOffset(selectedPage * perPage);
    },
    [perPage],
  );

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const postData = posts?.slice(offset, offset + perPage);
      if (posts?.length && postData) {
        setSlice(postData);
        setPageCount(Math.ceil(posts.length / perPage));
      }
    };
    getData();
  }, [offset, perPage, posts]);
  // }, [offset, router.query, perPage, asPath, posts]);

  let content;
  if (!posts.length) {
    content = <ConstMessage message='No posts yet' />;
  } else {
    content = (
      <div className='mb-8'>
        <PostList posts={slice} className='mr-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mr-0' />
        <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
      </div>
    );
  }

  return <div className='ml-2 mt-4 lg:ml-0'>{content}</div>;
});

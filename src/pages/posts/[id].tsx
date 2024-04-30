import { FC } from 'react';

import { useParams } from 'react-router';

import { useGetPostByIdQuery, useGetRelatedPostsQuery } from '@/features/posts/api';
import { PostDetails } from '@/features/posts/components/Details';
import { RelatedPosts } from '@/features/posts/components/RelatedPosts';

const Post: FC = () => {
  const { id: postId } = useParams();
  const { data: post } = useGetPostByIdQuery(postId);
  const { data: relatedPosts } = useGetRelatedPostsQuery(postId);

  return (
    <div className='w-screen lg:max-w-screen-lg lg:mx-4 lg:flex'>
      <div className='lg:mr-4 lg:w-7/12'>
        <PostDetails post={post} />
      </div>

      <div className='lg:w-5/12'>
        <RelatedPosts relatedPosts={relatedPosts} />
      </div>
    </div>
  );
};

export default Post;

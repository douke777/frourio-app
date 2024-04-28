import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, SkeltonAvatar } from '@/components/Element/Avatar';

import { PostWithDetails } from '$/types';

type Props = {
  post: PostWithDetails;
};

export const PostMain: FC<Props> = memo(({ post }) => {
  const { author, createdAt } = post;
  const { id, name, image } = author;

  return (
    <div>
      <div className='w-full rounded-none bg-primary text-neutral-content'>
        <div className='card-body'>
          <h2 className='card-title mb-4 text-2xl'>{post.title}</h2>
          <p className='mb-4'>{post.content}</p>
          <div className='flex justify-between'>
            <div className='card-actions'>
              <div className='badge-outline badge'>
                <Link to={`/categories/${post.categorySlug}`}>
                  <a>{post.categorySlug}</a>
                </Link>
              </div>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='mr-2'>
              <Link to={`/users/${id}`}>
                <a className='hover:opacity-50'>
                  <div className='flex w-full flex-col items-center justify-center'>
                    {image ? <Avatar src={image} size={60} /> : <SkeltonAvatar />}
                  </div>
                </a>
              </Link>
            </div>
            <div>
              <div className='font-semibold'>{name}</div>
              <div className='font-light'>{new Date(createdAt).toLocaleDateString('ja-JP')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

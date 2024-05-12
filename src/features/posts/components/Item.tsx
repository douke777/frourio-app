import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { faFolder } from '@fortawesome/free-solid-svg-icons';

import { Icon } from '@/components/Element/Icon';

import { Post } from '$/types';

import styles from './Item.module.css';

type Props = {
  post: Post;
};

export const PostItem: FC<Props> = memo(({ post }) => {
  return (
    <div className='card w-96 bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className={`card-title ${styles.title}`}>{post.title}</h2>
        <Link
          to={`/categories/${post.categorySlug}`}
          className='text-xs text-blue-500 hover:opacity-50'
        >
          <Icon icon={faFolder} className='mx-1' />
          {post.categorySlug}
        </Link>
        <p className={styles.desc}>{post.content}</p>
        <div className='card-actions justify-end'>
          <Link to={`/posts/${post.id}`} className='btn-primary btn'>
            Apply
          </Link>
        </div>
      </div>
    </div>
  );
});

import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

// import { signOut, useSession } from 'next-auth/client';

import { SearchForm } from '@/features/search/components/Search';

import { SkeltonAvatar } from '../Element/Avatar';

export const Navbar: FC = () => {
  const [session] = useState(true);
  const signOut = () => console.log('Sign Out');

  const avatar = session ? (
    // <Avatar src={session.user.image} size={100} className='w-10' />
    <SkeltonAvatar />
  ) : (
    <SkeltonAvatar />
  );

  return (
    <div className='navbar w-full bg-base-300'>
      <div className='flex-none'>
        <label htmlFor='my-drawer-3' className='btn-ghost btn-square btn'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block h-6 w-6 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            ></path>
          </svg>
        </label>
      </div>
      {/* title */}
      <div className='flex-1'>
        <Link to='/'>
          <a className='btn-ghost btn text-xl normal-case'>Crowd Sourcing Demo</a>
        </Link>
      </div>

      <div className='mr-4 hidden md:block'>
        <SearchForm />
      </div>

      {session ? (
        <div className='dropdown-end dropdown'>
          <label tabIndex={0} className='btn-ghost btn-circle btn'>
            {avatar}
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow'
          >
            <li>
              <Link to='/create'>
                <a>Create Post</a>
              </Link>
            </li>
            <li>
              <Link to='/mypage'>
                <a>My Page</a>
              </Link>
            </li>
            <li>
              <Link to='/mypage/settings'>
                <a>Settings</a>
              </Link>
            </li>
            <li>
              <button onClick={() => signOut()}>Sign Out</button>
            </li>
          </ul>
        </div>
      ) : (
        <>
          <Link to='/auth/signin'>
            <a className='btn'>Sign In</a>
          </Link>
        </>
      )}
    </div>
  );
};

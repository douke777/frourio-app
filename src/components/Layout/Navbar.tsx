import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useLogoutMutation } from '@/features/auth/api';
import { SearchForm } from '@/features/search/components/Search';

import useStore from '@/stores/session';

import { Avatar, SkeltonAvatar } from '../Element/Avatar';

export const Navbar: FC = () => {
  const { trigger: logout } = useLogoutMutation();
  const session = useStore((state) => state.session);

  const avatar = session ? (
    <Avatar
      src={session.image ? session.image : '/avatar-default.png'}
      size={100}
      className='w-10'
    />
  ) : (
    <SkeltonAvatar />
  );

  return (
    <div className='navbar w-full bg-base-300 z-navbar'>
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
        <Link to='/' className='btn-ghost btn text-xl normal-case'>
          Crowd Sourcing Demo
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
              <Link to='/posts/new'>Create Post</Link>
            </li>
            <li>
              <Link to='/my/profile'>My Profile</Link>
            </li>
            <li>
              <button onClick={() => logout()}>Logout</button>
            </li>
          </ul>
        </div>
      ) : (
        <>
          <Link to='/auth/login' className='btn'>
            Login
          </Link>
        </>
      )}
    </div>
  );
};

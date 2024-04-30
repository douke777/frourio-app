import { FC, memo, ReactNode } from 'react';

import { useLocation } from 'react-router';

import { DrawerSide } from '@/features/categories/components/DrawerSide';

import { Footer } from './Footer';
import { MainVisual } from './MainVisual';
import { Navbar } from './Navbar';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = memo(({ children }) => {
  const { pathname } = useLocation();

  return (
    <>
      <div className='drawer'>
        <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col'>
          <Navbar />
          {pathname === '/' && <MainVisual />}
          <div className='mx-auto min-h-fit max-w-screen-lg md:min-h-screen'>{children}</div>
          <Footer />
        </div>
        <DrawerSide />
      </div>
    </>
  );
});

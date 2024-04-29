import { FC } from 'react';
import { Link } from 'react-router-dom';

import { FOOTER_LIST } from '@/constants/footer';

export const Footer: FC = () => {
  return (
    <footer className='footer bg-neutral p-10 text-neutral-content lg:mt-6'>
      {FOOTER_LIST.map((item, i) => (
        <div key={i}>
          <span className='footer-title'>{item.title}</span>
          {item.links.map((link, j) => (
            <Link key={j} to={link.href} className='link-hover link'>
              {link.linkTitle}
            </Link>
          ))}
        </div>
      ))}
    </footer>
  );
};

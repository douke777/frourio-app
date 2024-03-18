import { FC, memo, ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

export const FormWrapper: FC<Props> = memo(({ title, children }) => {
  return (
    <>
      <div className='hero min-h-screen'>
        <div className='hero-content flex-col'>
          <div className='text-center'>
            <h1 className='text-5xl font-bold'>{title}</h1>
          </div>
          <div className='card w-full flex-shrink-0 bg-base-100 shadow-2xl md:w-screen md:max-w-screen-md'>
            {children}
          </div>
        </div>
      </div>
    </>
  );
});

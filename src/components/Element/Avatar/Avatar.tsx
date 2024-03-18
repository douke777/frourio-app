import { memo, FC } from 'react';

type Props = {
  src: string;
  size: number;
  className?: string;
};

export const Avatar: FC<Props> = memo(({ src, size, className }) => {
  return (
    <div className='avatar'>
      <div className={`rounded-full ${className}`}>
        <img src={src} width={size} height={size} />
      </div>
    </div>
  );
});

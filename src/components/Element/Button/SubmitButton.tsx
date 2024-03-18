import { FC, memo } from 'react';

type Props = {
  className: string;
  color: string;
  value: string;
  isLoading: boolean;
};

export const SubmitButton: FC<Props> = memo(({ className, color, value, isLoading }) => {
  return (
    <div className={`form-control items-center ${className}`}>
      <button
        className={`btn btn-${color} ${isLoading && 'loading'}`}
        disabled={isLoading}
        type='submit'
      >
        {value}
      </button>
    </div>
  );
});

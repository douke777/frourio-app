import { FC, memo } from 'react';

type Props = {
  errorMessage?: string;
  className?: string;
  testId?: string;
};

export const ErrorMessage: FC<Props> = memo(({ errorMessage, className, testId }) => {
  return (
    <p className={`text-red-600 ${className}`} data-testid={testId}>
      {errorMessage}
    </p>
  );
});

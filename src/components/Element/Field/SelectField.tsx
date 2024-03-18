import { ReactNode, FC } from 'react';

import { ErrorMessage } from '../Error/ErrorMessage';

type Props = Omit<JSX.IntrinsicElements['select'], 'ref'> & {
  label: string;
  errors?: string[];
  inputRef?: React.Ref<HTMLSelectElement>;
  children: ReactNode;
};

export const SelectField: FC<Props> = ({ label, errors, inputRef, children, ...inputProps }) => {
  return (
    <div className='form-control'>
      <label className='label'>
        <span className='label-text'>{label}</span>
      </label>
      <select className='select-bordered select w-full max-w-xs' {...inputProps} ref={inputRef}>
        {children}
      </select>
      {errors?.length && errors?.map((err) => <ErrorMessage key={err} errorMessage={err} />)}
    </div>
  );
};

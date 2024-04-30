import { FC } from 'react';

import { ErrorMessage } from '../Error/ErrorMessage';

type Props = Omit<JSX.IntrinsicElements['input'], 'ref'> & {
  label: string;
  errors?: string[];
  inputRef?: React.Ref<HTMLInputElement>;
};

export const InputField: FC<Props> = ({ label, errors, inputRef, ...inputProps }) => {
  console.log(inputRef);

  return (
    <div className='form-control'>
      <label className='label'>
        <span className='label-text'>{label}</span>
      </label>
      <input className='input-bordered input' {...inputProps} ref={inputRef} />
      {errors?.length && errors?.map((err) => <ErrorMessage key={err} errorMessage={err} />)}
    </div>
  );
};

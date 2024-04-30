import { FC } from 'react';

import { ErrorMessage } from '../Error';

type Props = Omit<JSX.IntrinsicElements['textarea'], 'ref'> & {
  label: string;
  errors?: string[];
  inputRef?: React.Ref<HTMLTextAreaElement>;
};

export const TextareaField: FC<Props> = ({ label, errors, inputRef, ...inputProps }) => {
  return (
    <div className='form-control'>
      <label className='label'>
        <span className='label-text'>{label}</span>
      </label>
      <textarea className='textarea-bordered textarea' {...inputProps} ref={inputRef} />
      {errors?.length && errors?.map((err) => <ErrorMessage key={err} errorMessage={err} />)}
    </div>
  );
};

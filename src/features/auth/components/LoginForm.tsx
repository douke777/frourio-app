import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { useLogin } from '@/features/auth/hooks/useLogin';

import { SubmitButton } from '@/components/Element/Button';
import { ErrorMessage } from '@/components/Element/Error';
import { InputField } from '@/components/Element/Field';
import { FormWrapper } from '@/components/Form';

export const LoginForm: FC = memo(() => {
  const { isMutating, errorMessage, onSubmit, fieldValues, errors } = useLogin();

  return (
    <FormWrapper title='Login'>
      <form
        className='card-body'
        method='post'
        action='/api/auth/callback/credentials'
        onSubmit={onSubmit}
      >
        <InputField
          {...fieldValues.email}
          errors={errors.email}
          label='Email'
          type='email'
          placeholder='email'
        />
        <InputField
          {...fieldValues.password}
          errors={errors.password}
          label='Password'
          id='password'
          type='password'
          placeholder='password'
        />
        <label className='label'>
          <Link to='/auth/password'>
            <a className='link-hover label-text-alt link'>Forgot password?</a>
          </Link>
        </label>
        <ErrorMessage errorMessage={errorMessage} className='text-center' testId='errorMessage' />

        <SubmitButton className='mt-2' color='primary' value='Login' isLoading={isMutating} />

        <div className='mt-4'>
          <p className='text-sm text-gray-400'>
            Do you have an account yet?
            <Link to='/auth/signup'>
              <a className='underline'>Sign Up</a>
            </Link>
          </p>
        </div>
      </form>
    </FormWrapper>
  );
});

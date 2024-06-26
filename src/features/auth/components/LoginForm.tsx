import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { useLogin } from '@/features/auth/hooks/useLogin';

import { SubmitButton } from '@/components/Element/Button';
import { InputField } from '@/components/Element/Field';
import { FormWrapper } from '@/components/Form';

export const LoginForm: FC = memo(() => {
  const { isMutating, onSubmit, fieldValues, errors } = useLogin();

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
          <Link to='/auth/password' className='link-hover label-text-alt link'>
            Forgot password?
          </Link>
        </label>

        <SubmitButton className='mt-2' color='primary' value='Login' isLoading={isMutating} />

        <div className='mt-4'>
          <p className='text-sm text-gray-400'>
            Do you have an account yet?
            <Link to='/auth/signup' className='underline'>
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </FormWrapper>
  );
});

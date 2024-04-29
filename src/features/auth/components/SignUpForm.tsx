import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { useSignUp } from '@/features/auth/hooks/useSignUp';

import { Avatar } from '@/components/Element/Avatar';
import { SubmitButton } from '@/components/Element/Button';
import { ErrorMessage } from '@/components/Element/Error';
import { InputField, SelectField } from '@/components/Element/Field';
import { FormWrapper } from '@/components/Form';

import { AVATARS } from '../constants/avatars';

export const SignUpForm: FC = memo(() => {
  const { isMutating, image, errorMessage, updateImage, onSubmit, fieldValues, errors } =
    useSignUp();

  return (
    <FormWrapper title='Sign Up'>
      <form className='card-body' onSubmit={onSubmit}>
        <div className='flex w-full flex-col items-center justify-center'>
          <Avatar
            src={image}
            size={120}
            className='w-24 ring ring-primary ring-offset-2 ring-offset-base-100'
          />
        </div>
        <SelectField
          {...fieldValues.image}
          errors={errors.image}
          label='Avatar'
          onChange={updateImage}
        >
          <option value='/avatar-default.png'>Default</option>
          {AVATARS.map((avatar) => (
            <option key={avatar.id} value={avatar.url}>
              {avatar.name}
            </option>
          ))}
        </SelectField>
        <InputField
          {...fieldValues.name}
          errors={errors.name}
          label='Name'
          type='text'
          placeholder='name'
        />
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
          type='password'
          placeholder='password'
        />
        <ErrorMessage errorMessage={errorMessage} className='text-center' testId='errorMessage' />

        <SubmitButton className='mt-2' color='primary' value='Sign Up' isLoading={isMutating} />

        <div className='mt-4'>
          <p className='text-sm text-gray-400'>
            Do you have an account yet?
            <Link to='/auth/login' className='underline'>
              Login
            </Link>
          </p>
        </div>
      </form>
    </FormWrapper>
  );
});

import { FC, Suspense, memo } from 'react';
import { Link } from 'react-router-dom';

import { SubmitButton } from '@/components/Element/Button';
import { InputField, TextareaField } from '@/components/Element/Field';
import { Loading } from '@/components/Element/Loading';
import { FormWrapper } from '@/components/Form';

import { useEditProfile } from '../hooks/useEditProfile';

export const ProfileEditForm: FC = memo(() => {
  const { data, isMutating, onSubmit, fieldValues, errors } = useEditProfile();

  return (
    <Suspense fallback={<Loading />}>
      <FormWrapper title='Edit Profile'>
        <form className='card-body' onSubmit={onSubmit}>
          <div className='flex w-full flex-col items-center justify-center'>
            <div className='avatar'>
              <div className='w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
                <img
                  src={data?.image ? data.image : '/avatar-default.png'}
                  width={120}
                  height={120}
                />
              </div>
            </div>
          </div>
          <InputField
            {...fieldValues.name}
            errors={errors.name}
            label='Name'
            type='text'
            placeholder='name'
          />

          <TextareaField
            {...fieldValues.bio}
            errors={errors.bio}
            label='Profile'
            placeholder='profile'
            id='bio'
            rows={6}
          />

          <SubmitButton className='mt-6' color='primary' value='Save' isLoading={isMutating} />
        </form>

        <div className='mb-8 text-center'>
          <Link to={`/users/${data?.id}`} className='text-gray-500 hover:opacity-50'>
            View Profile
          </Link>
        </div>
      </FormWrapper>
    </Suspense>
  );
});

import { FC } from 'react';

import { Avatar } from '@/components/Element/Avatar';

import { UserWithDetails } from '$/types';

type Props = {
  user: UserWithDetails;
};

export const Profile: FC<Props> = ({ user }) => {
  const { image, name, profile } = user;

  return (
    <>
      <div className='mx-4 lg:mx-2 lg:mr-10 lg:text-left'>
        <div className='flex items-center'>
          <div className='flex flex-col'>
            <Avatar
              src={image ? image : '/avatar-default.png'}
              size={100}
              className='w-24 ring ring-primary ring-offset-2 ring-offset-base-100'
            />
          </div>

          <div className='flex flex-col'>
            <p className='ml-4 text-xl font-bold lg:text-3xl'>{name}</p>
          </div>
        </div>

        {profile?.bio ? (
          <div className='mt-4 mb-8 h-40 break-words rounded-lg border py-4 px-6 leading-relaxed'>
            {profile.bio}
          </div>
        ) : (
          <div className='mt-4 mb-8 h-14 break-words rounded-lg border py-4 px-6 leading-relaxed text-gray-500'>
            No content
          </div>
        )}
      </div>
    </>
  );
};

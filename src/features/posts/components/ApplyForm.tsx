import { FC, memo } from 'react';

import { useApplyPost } from '@/features/posts/hooks/useApplyPost';

import { SubmitButton } from '@/components/Element/Button/SubmitButton';
import { TextareaField } from '@/components/Element/Field';

type Props = {
  post: { id: number };
};

export const ApplyForm: FC<Props> = memo(({ post }) => {
  const { handleSubmit, fieldValues, errors } = useApplyPost(post);

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col rounded bg-white px-8 pb-8'>
        <div className='mb-4'>
          <TextareaField
            {...fieldValues.message}
            label='Message'
            errors={errors.message}
            placeholder='message'
            rows={6}
          />
        </div>

        <SubmitButton className='mt-2 items-center' color='primary' value='Send Message' />
      </form>
    </>
  );
});

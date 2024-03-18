import { FC } from 'react';

import { useCategories } from '@/features/categories/api/getCategories';
import { usePost } from '@/features/posts/hooks/usePost';
import { Post } from '@/features/posts/types';

import { SubmitButton } from '@/components/Element/Button';
import { InputField, SelectField, TextareaField } from '@/components/Element/Field';
import { FormWrapper } from '@/components/Form';

type Props = {
  type: 'CREATE' | 'UPDATE';
  post?: Post;
};

export const PostForm: FC<Props> = ({ type, post }) => {
  // TODO: get session
  const { handleSubmit, fieldValues, errors } = usePost({
    type,
    post,
  });

  const { data: categories } = useCategories();

  return (
    <>
      <FormWrapper title={`${type} POST`}>
        <form className='card-body' onSubmit={handleSubmit}>
          <InputField
            {...fieldValues.title}
            errors={errors.title}
            label='Title'
            type='text'
            placeholder='title'
          />

          <TextareaField
            {...fieldValues.content}
            errors={errors.content}
            label='Description'
            placeholder='Description'
            rows={6}
          />

          <SelectField {...fieldValues.categorySlug} errors={errors.categorySlug} label='Category'>
            <option value=''>Please Select</option>
            {categories?.map(({ slug }) => {
              if (slug === 'new arrivals') return;

              return (
                <option key={slug} value={slug}>
                  {slug}
                </option>
              );
            })}
          </SelectField>

          <SubmitButton className='mt-6' color='primary' value={type} />
        </form>
      </FormWrapper>
    </>
  );
};

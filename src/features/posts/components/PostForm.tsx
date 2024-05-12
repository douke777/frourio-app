import { FC } from 'react';

import { useGetCategoriesQuery } from '@/features/categories/api';

import { SubmitButton } from '@/components/Element/Button';
import { InputField, SelectField, TextareaField } from '@/components/Element/Field';
import { FormWrapper } from '@/components/Form';

import { usePost } from '../hooks/usePost';

type Props = {
  type: 'CREATE' | 'UPDATE';
};

export const PostForm: FC<Props> = ({ type }) => {
  const { isMutating, onSubmit, fieldValues, errors } = usePost();

  const { data: categories } = useGetCategoriesQuery();

  return (
    <>
      <FormWrapper title={`${type} POST`}>
        <form className='card-body' onSubmit={onSubmit}>
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
            {categories.map(({ slug }) => (
              <option key={slug} value={slug}>
                {slug}
              </option>
            ))}
          </SelectField>

          <SubmitButton className='mt-6' color='primary' value={type} isLoading={isMutating} />
        </form>
      </FormWrapper>
    </>
  );
};

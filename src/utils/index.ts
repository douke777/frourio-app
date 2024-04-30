import { UseFormRegisterReturn } from 'react-hook-form';

export const convert = ({ ref, ...others }: UseFormRegisterReturn) => {
  return { inputRef: ref, ...others };
};

export const resolve = (field?: { message?: string }) => {
  return field?.message ? [field?.message] : undefined;
};

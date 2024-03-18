import { FC, memo } from 'react';

export const Head: FC = memo(() => {
  return (
    <>
      <title>Crowd Sourcing Demo</title>
      <meta name='description' content='Crowd Sourcing Demo' />
      <meta property='og:title' content='Crowd Sourcing Demo' />
      <meta property='og:description' content='Crowd Sourcing Demo' />
      <meta property='og:url' />
    </>
  );
});

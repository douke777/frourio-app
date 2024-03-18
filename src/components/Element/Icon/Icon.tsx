import { memo, FC } from 'react';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  icon: IconDefinition;
  className?: string;
};

export const Icon: FC<Props> = memo(({ icon, className }) => {
  return <FontAwesomeIcon icon={icon} className={className} />;
});

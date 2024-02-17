import React, { memo } from 'react';
import Error404 from '@/components/errors/404';

function NotFound() {
  return <Error404 />;
}

export default memo(NotFound);

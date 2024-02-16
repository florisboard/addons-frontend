import { notFound } from 'next/navigation';

// temp fix if we remove this page next infinite reload this page
const NotFoundCatchAll = () => notFound();

export default NotFoundCatchAll;

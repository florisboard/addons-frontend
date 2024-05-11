import api from '@/libs/api';
import { serverSideCache } from '..';

const getAboutServer = serverSideCache(api.about.about, ['about'], { revalidate: 300 });
export default getAboutServer;

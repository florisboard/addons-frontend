import * as yup from 'yup';
import errorMessages from '@/fixtures/errorMessages';

yup.setLocale(errorMessages.yup);

export default yup;

import * as yup from 'yup';
import errorMessages from '@/fixtures/forms/errorMessages';

yup.setLocale(errorMessages.yup);

export default yup;

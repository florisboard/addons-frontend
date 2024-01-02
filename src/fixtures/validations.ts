import yup from '@/libs/yup';
import errorMessages from './errorMessages';

const validations = {
  username: yup.string().required().min(3).max(30),
  slug: yup
    .string()
    .min(3)
    .max(255)
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  package_name: yup.string().min(3).max(255),
  email: yup.string().email().required().max(255),
  password: yup.string().required().min(8).max(50),
  title: yup.string().required().min(3).max(100),
  image: ['image/png', 'image/jpeg'],
};

export default validations;

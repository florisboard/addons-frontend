import yup from '@/libs/yup';

const validations = {
  username: yup.string().required().min(3).max(30),
  slug: yup
    .string()
    .required()
    .min(3)
    .max(255)
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  url: yup.string().min(3).max(255).url(),
  package_name: yup
    .string()
    .required()
    .min(3)
    .max(255)
    .matches(/^([A-Za-z]{1}[A-Za-z\d_]*\.)+[A-Za-z][A-Za-z\d_]*$/),
  email: yup.string().email().required().min(3).max(255),
  password: yup.string().required().min(8).max(50),
  title: yup.string().required().min(3).max(100),
  image: ['image/png', 'image/jpeg'],
};

export default validations;

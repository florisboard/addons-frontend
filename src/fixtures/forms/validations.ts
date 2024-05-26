import yup from '@/libs/yup';

const validations = {
  username: yup
    .string()
    .required()
    .min(3)
    .max(33)
    .test(/^[a-zA-Z_](?!.*?\.{2})[\w.]{1,33}\w/),
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
  description: yup.string().required().min(3).max(1024),
  domain: yup
    .string()
    .min(3)
    .max(255)
    .matches(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/),
  image: ['image/png', 'image/jpeg'],
};

export default validations;

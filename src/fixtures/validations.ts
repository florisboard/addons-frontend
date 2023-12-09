import * as Yup from 'yup';

const validations = {
  username: Yup.string().required().min(3).max(30),
  email: Yup.string().email().required().max(255),
  password: Yup.string().required().min(8).max(50),
  title: Yup.string().required().min(3).max(100),
};

export default validations;

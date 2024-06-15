import yup from '@/libs/yup';

const errorMessages = {
  yup: {
    mixed: {
      required: 'This field is required.',
    },
    string: {
      email: 'This field must be a valid email.',
      min: 'This field must be at least ${min} characters.',
      max: 'This field must be less than ${max} characters.',
      matches: 'This field is not valid.',
      url: 'This field must be a valid url (like https://github.com).',
    },
    number: {
      max: 'This field must be less than ${max}.',
      min: 'This field must be at least ${min}.',
    },
  } satisfies yup.LocaleObject,
  passwordsMatch: 'Passwords must match.',
  invalidCredentials: 'These credentials do not match our records.',
  somethingWentWrong: 'Something went wrong Please try again later.',
  tooManyAttempts: 'Too many attempts please try again later.',
} as const;

export default errorMessages;

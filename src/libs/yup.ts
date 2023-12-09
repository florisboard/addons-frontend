import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'This field is required.',
  },
  string: {
    email: 'This field must be a valid email.',
    min: 'This field must be at least {{ min }} characters.',
    max: 'This field must be less than {{ max }} characters.',
    matches: 'This field is not valid.',
  },
  number: {
    max: 'This field must be less than {{ max }}.',
    min: 'This field must be at least {{ min }}.',
  },
});

export default yup;

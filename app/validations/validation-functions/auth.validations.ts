import {
  ILoginForm,
  IRegisterForm,
  LoginErrors,
  RegisterErrors,
} from '@/types';

export const validateLogin = (data: ILoginForm) => {
  const errors: LoginErrors = {};
  if (!data.username.trim()) {
    errors.username = 'Please enter your username';
  }
  if (!data.password.trim()) {
    errors.password = 'Please enter your password';
  }
  return { errors, isValid: Object.keys(errors).length <= 0 };
};

export const validateRegister = (data: IRegisterForm) => {
  const errors: RegisterErrors = {};
  if (!data.username.trim()) {
    errors.username = 'Please enter a username';
  }
  if (!data.firstName.trim()) {
    errors.firstName = 'Please enter a first name';
  }
  if (!data.lastName.trim()) {
    errors.lastName = 'Please enter a last name';
  }
  if (!data.password.trim()) {
    errors.password = 'Please enter a password';
  }

  return { errors, isValid: Object.keys(errors).length <= 0 };
};

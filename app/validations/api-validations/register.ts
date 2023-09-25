export const validateRegistration = (
  username: string,
  password: string,
  lastName: string,
  firstName: string
) => {
  const errors: any = {};

  if (typeof username !== 'string' || username === undefined) {
    errors.username = 'Please enter a valid username';
  }

  if (typeof password !== 'string' || password === undefined) {
    errors.password = 'Please enter a valid password';
  }

  if (typeof lastName !== 'string' || lastName === undefined) {
    errors.lastName = 'Please enter a valid last name';
  }

  if (typeof firstName !== 'string' || firstName === undefined) {
    errors.firstName = 'Please enter a valid name for the first name';
  }

  return { errors, isValid: Object.keys(errors).length <= 0 };
};

import * as yup from "yup";

export const validate = async ({ schema, formData, setErrors }) => {
  setErrors({});

  let isValid = await schema
    .validate(formData, {
      abortEarly: false,
    })
    .then(() => true)
    .catch((validationErr) => {
      if (Array.isArray(validationErr.inner)) {
        let errors = {};
        validationErr.inner.forEach(
          ({ path, message }) => (errors[path] = message)
        );
        setErrors(errors);
      }
      return false;
    });

  return isValid;
};

export const feedbackSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("This field is required"),
  company: yup.string().required("This field is required"),
  comments: yup.string().required("This field is required"),
});

export const registerSchema = yup.object().shape({
  firstName: yup.string().required("This field is required"),
  lastName: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("This field is required"),
  password: yup.string().min(6, 'Password must be atleast 6 characters').required("This field is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("This field is required"),
  password: yup.string().min(6, 'Password must be atleast 6 characters').required("This field is required"),
});

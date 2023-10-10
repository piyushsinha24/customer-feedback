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

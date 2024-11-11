import { Formik, Form, Field } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";

import css from "./ContactForm.module.css"

const ContactForm = ({ onAdd }) => {
  const initialValues = { name: '', number: '' };

  
  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Please provide your name"),
    number: Yup.string()
      .matches(/^\d{3}-\d{2}-\d{2}$/, "Phone number format: 123-45-78")
      .required("Phone number is required"),
  });

  const handleSubmit = (values, actions) => {
    onAdd({
      id: nanoid(),  
      name: values.name,
      number: values.number,
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className={css.formItem}>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            {errors.name && touched.name && <div>{errors.name}</div>}
          </div>
          <div className={css.formItem}>
            <label htmlFor="number">Phone Number</label>
            <Field type="tel" name="number" />
            {errors.number && touched.number && <div>{errors.number}</div>}
          </div>
          <button className={css.submButton} type="submit">Add Contact</button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;

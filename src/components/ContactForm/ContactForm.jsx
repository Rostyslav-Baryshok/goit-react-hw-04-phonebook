import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Label, InputEl } from './ContactForm.styled';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().required(),
});

export const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Label>
          <InputEl>Name</InputEl>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" />
        </Label>
        <Label>
          <InputEl>Number</InputEl>
          <Field type="tel" name="number" />
          <ErrorMessage name="number" component="div" />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    </Formik>
  );
};

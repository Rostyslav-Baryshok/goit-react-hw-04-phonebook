import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Label, InputEl } from './ContactForm.styled';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().required(),
});

export class ContactForm extends Component {
  hadleSubmit = (values, { resetForm }) => {
    const newName = {
      name: values.name,
      number: values.number,
    };
    this.props.onSubmit(newName);
    resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={schema}
        onSubmit={this.hadleSubmit}
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
  }
}

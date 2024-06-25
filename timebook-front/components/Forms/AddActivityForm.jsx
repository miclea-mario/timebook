import { Formik, Form, Field } from 'formik';
import { validationSchema, initialValues } from '../../models/addActivity';
import { ActivityDuration, Checkbox, Textarea } from '../Fields';
import SelectProject from '../Fields/SelectProject';
import SelectPerson from '../Fields/SelectPerson';
import { Fieldset, Submit } from '../Formik';
import ActivityDate from '../Activities/ActivityDate';
import { createActivity } from '../../api/activities';
import { toaster } from '../../lib';
import { useState } from 'react';

const AddActivityForm = ({ hideModal }) => {
  const handleSubmit = async (values, resetForm, setFieldValue) => {
    try {
      await createActivity(values);
      toaster.success('Activitatea a fost adaugata');
      if (checkbox) {
        let date = values.date;
        resetForm();
        setFieldValue('date', date);
      } else if (typeof hideModal === 'function') {
        hideModal();
      }
    } catch (e) {
      toaster.error('Activitatea nu a putut fi adaugata');
      // eslint-disable-next-line
      console.log(e);
    }
    return;
  };

  const [checkbox, setCheckbox] = useState(false);

  return (
    <div className="w-full p-4 bg-white rounded-lg max-w-xl px-6 dark:text-white dark:border dark:border-gray-500 dark:bg-slate-900">
      <h1 className="font-bold text-2xl mb-10">Adaugă o activitate</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setFieldValue }) =>
          handleSubmit(values, resetForm, setFieldValue)
        }
      >
        <Form className="flex flex-col space-y-4">
          <div className="flex">
            <div className="w-1/2 mr-6">
              <ActivityDate />
            </div>
            <div className="w-1/2">
              <ActivityDuration />
            </div>
          </div>
          <SelectPerson />
          <SelectProject />
          <Fieldset name="description" label="Descriere">
            <Field
              id="description"
              name="description"
              as={Textarea}
              rows={2}
              className="textarea"
              autoComplete="off"
            />
          </Fieldset>

          <div className="flex justify-between">
            <Checkbox
              onChange={() => {
                setCheckbox(!checkbox);
              }}
              className="form-checkbox rounded mt-6"
            >
              <div className="w-40 mt-6">Continuă să adaugi</div>
            </Checkbox>
            <div className="flex gap-4">
              <button
                className="px-5 py-2 bg-accent text-white rounded-md mt-4"
                onClick={hideModal}
                type="reset"
              >
                Anulează
              </button>
              <Submit className="px-5 py-2 bg-primary text-white rounded-md">Confirmă</Submit>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddActivityForm;

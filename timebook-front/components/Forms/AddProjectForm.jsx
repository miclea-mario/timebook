import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { toaster } from '../../lib';
import { Submit } from '../Formik';
import { validationSchema, initialValues } from '../../models/add-project';
import { createProject } from '../../api/projects';
import ProjectFields from './ProjectFields';

const AddProjectForm = () => {
  const router = useRouter();

  const handleSubmit = async (values) => {
    try {
      await createProject(values);
      toaster.success('Proiectul a fost adaugat');
      router.push('/admin/projects');
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
      toaster.error('Proiectul nu a putut fi adaugat');
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <ProjectForm submitText="Adaugă"/>
    </Formik>
  );
};

export default AddProjectForm;

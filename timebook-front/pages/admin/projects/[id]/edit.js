import { useRouter } from 'next/router';
import { checkAuth, withAuth } from '../../../../auth';
import { Layout } from '../../../../components';
import {
  UpdateProjectFormError,
  UpdateProjectFormLoading,
  UpdateProjectFormSuccess,
} from '../../../../components/Forms/';
import { useQuery } from '../../../../hooks';

const Page = () => {
  const router = useRouter();
  const query = router.query;
  const id = query.id;
  const { data, status } = useQuery(`projects/${id}`);
  return (
    <Layout title="Editeaza proiect" role="admin">
      {status === 'loading' && <UpdateProjectFormLoading />}
      {status === 'error' && <UpdateProjectFormError />}
      {status === 'success' && <UpdateProjectFormSuccess data={data} />}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);

import React from 'react';
import { withAuth } from '../../../auth';
import { Layout } from '../../../components';
import { RequestVacationForm } from '../../../components/Vacations';
import { useProfile } from '../../../hooks';

const Page = () => {
  const { me, status } = useProfile();
  return (
    <Layout title="Timebook" role="user">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white ">Solicită un concediu</h2>
      <div className="card max-w-md">
        {status === 'success' && <RequestVacationForm id={me.me} />}
      </div>
    </Layout>
  );
};

export default withAuth(Page);

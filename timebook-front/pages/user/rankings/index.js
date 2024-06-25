import { Layout } from '../../../components';
import { withAuth } from '../../../auth';
import { useQuery } from '../../../hooks';
import { RankingTableSuccess, RankingTableLoading, RankingTableError } from '../../../components/Rankings';

const Page = () => {
  const { data, status } = useQuery('rankings', {
    role: 'user',
    active: true,
  });

  return (
    <Layout title="Timebook" role="user">
      <div className="bg-primary text-white rounded-t-xl">
        <div className="flex flex-row items-center justify-between p-4">
          <h1 className="font-bold text-2xl mb-4">Clasament</h1>
        </div>
      </div>
      <div className="flex my-6 gap-6">
        {status === 'loading' && <RankingTableLoading />}
        {status === 'error' && <RankingTableError />}
        {status === 'success' && (
          <div className="flex flex-col gap-4 w-full">
            <RankingTableSuccess data={data} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withAuth(Page);

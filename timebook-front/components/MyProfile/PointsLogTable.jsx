import { useInfiniteQuery } from '../../hooks';
import PointsLogTableLoading from './PointsLogTableLoading';
import AdminListError from '../AdminList/AdminListError';
import PointsLogTableSuccess from './PointsLogTableSuccess';
import LoadMore from '../LoadMore';

const PointsLogTable = ({ id }) => {
  const { data, refetch, status, ...rest } = useInfiniteQuery('point-logs', {
    per_page: 5,
    userId: id,
  });
  console.log(data);
  return (
    <article className="w-full">
      {status === 'loading' && <PointsLogTableLoading />}
      {status === 'error' && <AdminListError />}
      {status === 'success' && (
        <div className='flex flex-col gap-2'>
          <PointsLogTableSuccess data = {data.pages} />
          <LoadMore {...rest} />
        </div>
      )}
    </article>
  );
};

export default PointsLogTable;

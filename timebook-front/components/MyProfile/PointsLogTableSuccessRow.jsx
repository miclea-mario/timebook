import { format, getMonth, getYear } from 'date-fns';
import { ro } from 'date-fns/locale';

const PointsLogTableSuccessRow = ({ description, createdAt }) => {
  const formattedDate = `${format(new Date(createdAt), 'dd MMMM', { locale: ro })}`;
  return (
    <tr className="table-row">
      <td className="p-4 w-20 md:px-2 px-8 font-bold text-wrap">{formattedDate}</td>
      <td className="p-4 md:px-2 px-8 font-bold text-wrap">{description}</td>
    </tr>
  );
};

export default PointsLogTableSuccessRow;

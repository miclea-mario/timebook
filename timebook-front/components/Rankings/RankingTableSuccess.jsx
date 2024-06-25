import { MessageNoRows } from '../LogbookTable';
import RankingTableHead from './RankingTableHead';

const RankingTableSuccess = ({ data, refetch }) => {
  const getStarColor = (index) => {
    switch (index) {
      case 0:
        return 'text-yellow-500'; // Gold for 1st place
      case 1:
        return 'text-gray-500'; // Silver for 2nd place
      case 2:
        return 'text-orange-600'; // Bronze for 3rd place
      default:
        return '';
    }
  };

  const showData = ({ _id, first_name, last_name, points }, index) => {
    return (
      <tr key={`user-vacations-${_id}`} className="table-row">
        <td className="p-3 flex gap-2 items-center">
          {index < 3 && (
            <div className="relative inline-block">
              <i className={`fa-solid fa-star text-xl ${getStarColor(index)}`}></i>
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                {index + 1}
              </span>
            </div>
          ) || (
            <span className="text-gray-400 font-bold">{index + 1}</span>
          )}
          <span className="w-full flex items-center gap-2 font-semibold">
            {`${first_name} ${last_name.toUpperCase()}`}
          </span>
        </td>
        <td className="p-3 w-20">{points}</td>
      </tr>
    );
  };

  return (
    <div className="flex flex-col w-full">
      <table className="min-w-full">
        <RankingTableHead />
        <tbody>{data.map(showData)}</tbody>
      </table>
      {!data?.length && <MessageNoRows />}
    </div>
  );
};

export default RankingTableSuccess;

import React from 'react';
import PointsLogTableSuccessRow from './PointsLogTableSuccessRow';
import { classnames } from '../../lib';

const PointsLogTableSuccess = ({ data }) => {
  return (
    <div className={classnames('max-h-50 sm:w-full overflow-x-auto relative -mx-4 sm:mx-0')}>
      <table className={classnames('w-full border-collapse rounded-lg shadow-md overflow-x-auto')}>
        <tbody className={classnames('whitespace-nowrap text-sm text-gray-500')}>
          {data.map((row) => {
            return <PointsLogTableSuccessRow {...row} key={row._id} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PointsLogTableSuccess;

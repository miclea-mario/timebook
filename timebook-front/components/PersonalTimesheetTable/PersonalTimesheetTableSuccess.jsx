import { getTotalTimeWorked } from '../../functions';
import Description from '../Description';
import { Checkbox } from '../Fields';
import FormatDuration from '../FormatDuration';
import { ActivityDate, MessageNoRows, ProjectLink } from '../LogbookTable';
import PersonalTimesheetRowActions from './PersonalTimesheetRowActions';
import PersonalTimesheetTableHead from './PersonalTimesheetTableHead';
import { groupBy } from 'lodash';

const PersonalTimesheetTableSuccess = ({ data, refetch, selectedRows, setSelectedRows }) => {
  const removeSelection = (id) => setSelectedRows((prev) => prev.filter((el) => el !== id));
  const addSelection = (id) => setSelectedRows((prev) => [...prev, id]);
  const groupedData = groupBy(data, 'date');

  const toggleRow = (id) => {
    if (selectedRows.includes(id)) {
      removeSelection(id);
    } else {
      addSelection(id);
    }
  };

  const allRowsSelected = data.length && data.length === selectedRows.length;
  const toggleAll = () => {
    if (!data?.length) {
      return;
    }

    if (allRowsSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((el) => el._id));
    }
  };

  const renderDays = (date, colorIndex) => {
    const element = [];
    for (let i = 0; i < groupedData[date].length; i++) {
      element.push(
        showActivity(groupedData[date][i], colorIndex, i === groupedData[date].length - 1)
      );
    }
    return element;
  };

  const showActivity = (activity, colorIndex, addSpace) => {
    const { _id } = activity;
    const isSelected = selectedRows.includes(_id);
    return (
      <tr
        key={activity._id}
        className="bordex-x border-t dark:bg-slate-800 dark:text-white dark:border-t-slate-600 dark:border-x-slate-600 dark:border-b-slate-700"
        style={{
          backgroundColor: 'white',
          borderBottom: addSpace && '1.75rem solid rgb(243, 244, 246)',
        }}
      >
        <td className="p-3">
          <Checkbox
            onChange={() => toggleRow(activity._id)}
            checked={isSelected}
            className={'form-checkbox p-2 cursor-pointer checked:bg-primary ring-primary'}
          />
        </td>
        <td className="p-3 w-40">
          <ActivityDate date={activity.date} />
        </td>
        <td className="px-3 py-2 w-28">
          <FormatDuration duration={activity.duration} />
        </td>
        <td className="p-3 w-64">
          <ProjectLink {...activity.project} />
        </td>
        <td className="p-3">
          <Description description={activity.description} limit={95} />
        </td>

        <td className="p-3 w-20">
          <PersonalTimesheetRowActions activity={activity} refetch={refetch} />
        </td>
      </tr>
    );
  };

  return (
    <div className="flex flex-col w-full">
      <table className="min-w-full">
        <PersonalTimesheetTableHead toggleAll={toggleAll} checked={allRowsSelected} />
        <tbody>
          <tr className="border-b bg-primary">
            <td className="p-3 w-40">
              <span className="text-white">Total selectat:</span>{' '}
            </td>
            <td className="px-3 py-2 w-28">
              <span className="font-bold text-white">
                <FormatDuration duration={getTotalTimeWorked(data, selectedRows)} />
              </span>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {Object.keys(groupedData).map(renderDays)}
        </tbody>
      </table>
      {!data?.length && <MessageNoRows />}
    </div>
  );
};

export default PersonalTimesheetTableSuccess;

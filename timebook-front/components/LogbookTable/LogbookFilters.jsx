import { DateRange, ProjectFilter, UserFilter } from '../Fields';

const LogbookFilters = ({ setOptions }) => {
  const setProjectFilter = (project) => {
    if (project) {
      setOptions((prev) => ({ ...prev, project: project}));
    } else {
      setOptions(({ project, ...prev }) => prev);
    }
  };

  const setUserFilter = (user) => {
    if (user) {
      setOptions((prev) => ({
        ...prev,
        user: user,
      }));
    } else {
      setOptions(({ user, ...prev }) => prev);
    }
  };

  const setRangeFilter = ({ from, to }) => {
    if (from && to) {
      setOptions((prev) => ({
        ...prev,
        from,
        to,
      }));
    } else {
      setOptions(({ from, to, ...prev }) => prev);
    }
  };

  return (
    <div className="flex gap-6">
      <ProjectFilter onChange={setProjectFilter}></ProjectFilter>
      <UserFilter onChange={setUserFilter}></UserFilter>
      <DateRange className="flex gap-5" onChange={setRangeFilter} />
    </div>
  );
};

export default LogbookFilters;

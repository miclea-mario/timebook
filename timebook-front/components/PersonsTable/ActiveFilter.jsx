import { useEffect } from 'react';

const ActiveFilter = ({ setOptions, defaultValue = '' }) => {
  const transformFilterValue = (value) => {
    switch (value) {
      case '':
        return '';
      case 'active':
        return true;
      case 'inactive':
        return false;
    }
  };

  const udpateOptions = (value) => {
    if (value) {
      setOptions((prev) => ({ ...prev, active: transformFilterValue(value) }));
    } else {
      setOptions(({ active, ...prev }) => prev);
    }
  };

  // on initial render, set query options according to defaultValue of filter
  useEffect(() => {
    udpateOptions(defaultValue);
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    udpateOptions(value);
  };

  return (
    <div className="w-1/2 lg:w-1/4">
      <label className="font-semibold mb-1">Tip persoane</label>
      <select className="select" onChange={handleChange} defaultValue={defaultValue}>
        <option value="">Toate</option>
        <option value="inactive">Inactive</option>
        <option value="active">Active</option>
      </select>
    </div>
  );
};

export default ActiveFilter;

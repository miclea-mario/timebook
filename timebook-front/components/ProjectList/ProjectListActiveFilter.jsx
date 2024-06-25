import React from 'react';

const ProjectListActiveFilter = ({ onChange }) => {
  return (
    <div>
      <label className="font-semibold mb-1">Tip proiecte</label>
      <select className="select" onChange={(e) => onChange(e.target.value)}>
        <option className="w-full" value={true}>
          Proiecte active
        </option>
        <option className="w-full" value={false}>
          Proiecte inactive
        </option>
        <option className="w-full" value="">
          Toate
        </option>
      </select>
    </div>
  );
};

export default ProjectListActiveFilter;

import { DebouncedInput } from '../Fields';

const NameFilter = ({ setOptions }) => {
  const udpateOptions = (name) => {
    if (name) {
      setOptions((prev) => ({ ...prev, name }));
    } else {
      setOptions(({ name, ...prev }) => prev);
    }
  };

  const handleChange = (name) => {
    udpateOptions(name);
  };

  return (
    <div className="relative w-1/2 lg:w-1/4">
      <label className="font-semibold mb-1 block">Nume persoana</label>
      <DebouncedInput
        placeholder="Cauta dupa nume"
        className="select"
        onChange={handleChange}
        timeout={500}
      />
      <span className="absolute right-0 p-2 outline-none pt-2.5">
        <i className="fa-solid fa-magnifying-glass text-primary dark:text-slate-400" />
      </span>
    </div>
  );
};

export default NameFilter;

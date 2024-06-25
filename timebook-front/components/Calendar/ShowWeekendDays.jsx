import { Checkbox } from '../Fields';

const ShowWeekendDays = ({ onChange, showWeekend }) => {
  return (
    <div className="">
      <Checkbox
        onChange={onChange}
        className="form-checkbox rounded-full"
        checked={showWeekend && 'checked'}
      >
        <span>Arata zilele de weekend</span>
      </Checkbox>
    </div>
  );
};

export default ShowWeekendDays;

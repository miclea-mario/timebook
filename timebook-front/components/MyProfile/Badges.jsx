import Badge from './Badge';

const Badges = ({ badges }) => {
  return (
    <div className="grid grid-cols-3 justify-center gap-2 mt-4">
      {badges.map((badge) => (
        <Badge key={badge._id} name={badge.name} icon={badge.icon} />
      ))}
    </div>
  );
};

export default Badges;

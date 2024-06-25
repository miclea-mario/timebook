const Badge = ({ name, icon }) => {
  return (
    <div className="w-20 flex flex-col items-center gap-1">
      <img src={icon} alt={name} className="w-9/12 h-auto" />
      <p className="text-xs text-center dark:text-white">{name}</p>
    </div>
  )
}

export default Badge

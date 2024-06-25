module.exports = () => {
  return [
    {
      name: 'Timebook',
      active: true,
      important: false,
      urgent: true,
      description: 'A time management app, developed especially for Chess Coders',
      status: 'Will be finished September 9th',
      updatedAt: new Date('2022-04-21'),
      icon: 'fa-regular fa-calendar-days',
    },
    {
      name: 'Prima Development',
      active: true,
      important: true,
      urgent: false,
      description: 'Cost tracking app for the Real Estate company Prima Development',
      status: 'In progress, coming to an end soon',
      updatedAt: new Date('2022-05-22'),
      icon: 'fa-regular fa-building',
    },
    {
      name: 'Playground',
      active: true,
      important: true,
      urgent: false,
      description: 'App for managing insurance policies and other stuff related to this field.',
      status: 'In progress for the following month, at least',
      updatedAt: new Date('2022-07-29'),
      icon: 'fa-solid fa-car-side',
    },
    {
      name: 'RNPM',
      active: false,
      important: true,
      urgent: false,
      description: 'App for handling mortgages and other papers related to real estate',
      status: 'Finished',
      updatedAt: new Date('2021-12-31'),
      icon: 'fa-solid fa-gavel',
    },
    {
      name: 'FRSah ERP',
      active: true,
      important: true,
      urgent: true,
      description:
        'App for tracking players, clubs and tournaments. Also handles online payment of taxes',
      status: 'Development complete. Currently in testing',
      updatedAt: new Date('2022-08-28'),
      icon: 'fa-solid fa-chess-king'
    },
  ];
};

module.exports = (documents = []) => {
  const totals = {
    annual: 0,
    available: 0,
    bonus: 0,
    extratime: 0,
    vacation_approved: 0,
  };

  for (let i = 0; i < documents.length; i++) {
    const { amount, type, status } = documents[i];
    if (status !== 'approved') {
      continue;
    }

    switch (type) {
      case 'annual':
        totals.annual += amount;
        break;
      case 'bonus':
        totals.bonus += amount;
        break;
      case 'extra-time':
        totals.extratime += amount;
        break;
      case 'vacation':
        totals.vacation_approved += amount;
        break;
    }

    totals.available = totals.annual + totals.bonus + totals.extratime - totals.vacation_approved;
  }

  return totals;
};

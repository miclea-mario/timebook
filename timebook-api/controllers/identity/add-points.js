const { Identity, Activity, PointLogs } = require('../../models');
const { error, getDaysBetweenDates, formatDuration } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(400, 'You must provide an id');
  }

  const userIdentity = await Identity.findById(id);
  
  if (!userIdentity) {
    return error(400, 'Identity not found');
  }

  const lastAddedActivity = await Activity.findOne({ user: id }).sort({ createdAt: -1 });

  if (!lastAddedActivity) {
    return error(400, 'Activity not found');
  }

  const daysBetween = getDaysBetweenDates(new Date(), new Date(lastAddedActivity.date));
  const percent = calculatePointsPercent(daysBetween);
  let pointsReceived = 0;

  if (percent > 0) {
    pointsReceived = Math.floor(percent * lastAddedActivity.duration);
    await addUserPoints(userIdentity, pointsReceived, lastAddedActivity.description);
  }

  // badges
  const newBadges = [];

  if (await checkPunctualBookerBadge(userIdentity)) {
    newBadges.push('punctual-booker');
  }

  if (await checkLazySlothBadge(userIdentity, lastAddedActivity)) {
    newBadges.push('lazy-sloth');
  }

  if (await checkIDoItForThePleasureBadge(userIdentity, lastAddedActivity)) {
    newBadges.push('i-do-it-for-the-pleasure');
  }
  
  return res.status(200).json({ newBadges, pointsReceived, message: 'Points added'});
};

// Add user points and log the points activity
const addUserPoints = async (user, points, description) => {
  await user.updateOne({ points: user.points + points });
  await PointLogs.create({ description: `Ai primit ${points} ${points > 1 ? 'puncte' : 'punct'} pentru adăugarea activității "${description}"`, user });
};

// Calculate points percentage based on the days between
const calculatePointsPercent = (daysBetween) => {
  if (daysBetween === 0) {
    return 5 / 8;
  } else if (daysBetween === 1) {
    return 3 / 8;
  } else if (daysBetween >= 2 && daysBetween <= 7) {
    return 1 / 8;
  }
  return 0;
};


const checkPunctualBookerBadge = async (user) => {
  const formattedDate = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD' format

  // get activities for the current day and sum their duration
  const activities = await Activity.find({ user: user._id, date: formattedDate});
  const activitiesDuration = activities.reduce((acc, activity) => acc + activity.duration, 0);
  const activitiesDurationHours = formatDuration(activitiesDuration);

  // give badge if the user has added 8 hours of activities in the same day
  if(activitiesDurationHours >= 8 && !user.badges.find(badge => badge.name === "punctual-booker")) {
    await user.updateOne({ badges: [...user.badges, {name: "punctual-booker"}] });
    await PointLogs.create({ description: 'Ai primit badge-ul "Punctual Booker" pentru adăugarea a 8 ore de activități în aceeași zi', user });
    return true;
  }

  return false;
}

const checkLazySlothBadge = async (user, lastAddedActivity) => {
  const daysBetween = getDaysBetweenDates(new Date(), new Date(lastAddedActivity.date));
  
  // give badge if the user has added an activity with 8 days delay
  if(daysBetween >= 8 && !user.badges.find(badge => badge.name === "lazy-sloth")) {
    await user.updateOne({ badges: [...user.badges, {name: "lazy-sloth"}] });
    await PointLogs.create({ description: 'Ai primit badge-ul "Lazy Sloth" pentru adăugarea unei activități cu 1 săptămână întârziere', user });
    return true;
  }

  return false;
}

const checkIDoItForThePleasureBadge = async (user, lastAddedActivity) => {
  const lastActivityDate = new Date(lastAddedActivity.date);

  // give badge if the user has added an activity in the weekend
  if(lastActivityDate.getDay() === 0 || lastActivityDate.getDay() === 6 && !user.badges.find(badge => badge.name === "i-do-it-for-the-pleasure")) {
    await user.updateOne({ badges: [...user.badges, {name: "i-do-it-for-the-pleasure"}] });
    await PointLogs.create({ description: 'Ai primit badge-ul "I Do It For The Pleasure" pentru adăugarea unei activități în weekend', user });
    return true;
  }

  return false;
}

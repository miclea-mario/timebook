const { Project, Identity, PointLogs } = require('../../models');
const { error, getDaysBetweenDates, formatDuration } = require('../../functions');
const { Activity } = require('../../models');

module.exports = async (req, res) => {
  // "user" is the identity who sent the request
  // "person" is the identity associated with the activity
  const { body } = req;
  if (!body) {
    throw error(400, 'Must provide a body');
  }

  const { user: personId } = body;
  const { user } = req;
  const { me: userId } = user;

  const userIdentity = await Identity.findById(userId);
  const personIdentity = await Identity.findById(personId);
  if (!userIdentity || !personIdentity) {
    throw error(400, 'User not found');
  }

  const new_body = {
    ...req.body,
    user: user.role === 'user' ? userId : personId,
  };

  const project = await Project.findById(new_body.project);
  if (!project?.active) {
    throw error(400, `Project is not active or it doesn't exist`);
  }

  const document = await Activity.create(new_body);

  if (!document) {
    throw error(400, `Activity couldn't be created`);
  }

  // Get days between now and the activity date
  const daysBetween = getDaysBetweenDates(new Date(), new Date(document.date));
  const percent = calculatePointsPercent(daysBetween);

  if (percent > 0) {
    const pointsReceived = Math.floor(percent * document.duration);
    await addUserPoints(personIdentity, pointsReceived, document.description);
  }

  await checkUserBadges(personIdentity, document);

  return res.status(200).json({ document, message: 'Activity created' });
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

// Add user points and log the points activity
const addUserPoints = async (user, points, description) => {
  await user.updateOne({ points: user.points + points });
  await PointLogs.create({ description: `Ai primit ${points} ${points > 1 ? 'puncte' : 'punct'} pentru adăugarea activității "${description}"`, user });
};

const checkUserBadges = async (user, lastAddedActivity) => {
  if(!user || !lastAddedActivity) 
    throw error(400, 'User or Activity not found');

  await checkPunctualBookerBadge(user);
  await checkLazySlothBadge(user, lastAddedActivity);
  await checkIDoItForThePleasureBadge(user, lastAddedActivity);
}

const checkPunctualBookerBadge = async (user) => {
  const formattedDate = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD' format

  const activities = await Activity.find({ user: user._id, date: formattedDate});
  const activitiesDuration = activities.reduce((acc, activity) => acc + activity.duration, 0);
  const activitiesDurationHours = formatDuration(activitiesDuration);

  if(activitiesDurationHours >= 8 && !user.badges.find(badge => badge.name === "punctual-booker")) {
    await user.updateOne({ badges: [...user.badges, {name: "punctual-booker"}] });
    await PointLogs.create({ description: 'Ai primit badge-ul Punctual Booker pentru adăugarea a 8 ore de activități în aceeași zi', user });
  }
}

const checkLazySlothBadge = async (user, lastAddedActivity) => {
  const daysBetween = getDaysBetweenDates(new Date(), new Date(lastAddedActivity.date));
  
  if(daysBetween >= 8 && !user.badges.find(badge => badge.name === "lazy-sloth")) {
    await user.updateOne({ badges: [...user.badges, {name: "lazy-sloth"}] });
    await PointLogs.create({ description: 'Ai primit badge-ul Lazy Sloth pentru adăugarea unei activități cu 1 săptămână întârziere', user });
  }
}

const checkIDoItForThePleasureBadge = async (user, lastAddedActivity) => {
  const lastActivityDate = new Date(lastAddedActivity.date);
  if(lastActivityDate.getDay() === 0 || lastActivityDate.getDay() === 6) {
    await user.updateOne({ badges: [...user.badges, {name: "i-do-it-for-the-pleasure"}] });
    await PointLogs.create({ description: 'Ai primit badge-ul I Do It For The Pleasure pentru adăugarea unei activități în weekend', user });
  }
}
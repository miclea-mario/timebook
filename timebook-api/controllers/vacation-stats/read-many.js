const { VacationTransaction } = require('../../models');
const mongodb = require('mongodb');
const { getYear } = require('date-fns');

module.exports = async (req, res) => {
  const userFilter = req.query.user;
  const yearFilter = req.query.year || getYear(new Date());

  const match =
    userFilter && yearFilter
      ? {
          $match: {
            year: parseInt(yearFilter),
            'user._id': mongodb.ObjectId(userFilter),
          },
        }
      : userFilter
      ? { $match: { 'user._id': mongodb.ObjectId(userFilter) } }
      : yearFilter
      ? { $match: { year: parseInt(yearFilter) } }
      : {};

  const documents = await VacationTransaction.aggregate([
    {
      $lookup: {
        from: 'identities',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    match,
    {
      $group: {
        _id: '$user',
        totalAvailable: { $sum: '$amount' },
        totalAnnual: {
          $sum: {
            $cond: [
              {
                $or: [
                  { $eq: ['$type', 'annual'] },
                  // { $eq: ['$type', 'bonus'] },
                  // { $eq: ['$type', 'extra-time'] },
                ],
              },
              '$amount',
              0,
            ],
          },
        },
        totalBonus: {
          $sum: {
            $cond: [
              {
                $or: [
                  // { $eq: ['$type', 'annual'] },
                  { $eq: ['$type', 'bonus'] },
                  // { $eq: ['$type', 'extra-time'] },
                ],
              },
              '$amount',
              0,
            ],
          },
        },
        totalExtratime: {
          $sum: {
            $cond: [
              {
                $or: [
                  // { $eq: ['$type', 'annual'] },
                  // { $eq: ['$type', 'bonus'] },
                  { $eq: ['$type', 'extra-time'] },
                ],
              },
              '$amount',
              0,
            ],
          },
        },
        totalVacationApproved: {
          $sum: {
            $cond: [
              {
                $or: [
                  // { $eq: ['$type', 'annual'] },
                  // { $eq: ['$type', 'bonus'] },
                  // { $eq: ['$type', 'extra-time'] },
                  { $eq: ['$type', 'vacation-approved'] },
                ],
              },
              '$amount',
              0,
            ],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        user: '$_id',
        totalAvailable: 1,
        totalAnnual: 1,
        totalBonus: 1,
        totalExtratime: 1,
        totalVacationApproved: 1,
        year: req.user.year,
      },
    },
  ]);

  return res.status(200).json(documents);
};

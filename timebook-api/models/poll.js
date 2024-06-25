const { Schema, model } = require('mongoose');
const { reference } = require('express-goodies/mongoose');
const votingOptionSchema = require('./voting-option');

/*
 * Poll details
 */

const name = 'poll';
const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high'],
    },
    question: {
      type: String,
      required: true,
    },
    totalVotes: {
      type: Number,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'approved', 'rejected'],
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
    options: {
      type: [votingOptionSchema],
      required: true,
    },
    createdBy: {
      type: reference,
    },
    activatedAt: {
      type: Date,
      default: null,
    },
    daysUntilExpire: {
      type: Number,
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    pollVoters: [reference],
  },
  { timestamps: true }
);

module.exports = model(name, schema);

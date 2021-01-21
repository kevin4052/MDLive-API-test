const { Schema, model } = require('mongoose');

const appSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Apps', appSchema);

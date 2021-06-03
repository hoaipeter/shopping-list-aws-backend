const mongoose = require('mongoose');
const schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    finished: Boolean
  },
  { timestamps: true }
);

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model('ShoppingList', schema);

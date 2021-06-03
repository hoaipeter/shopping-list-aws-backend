const ShoppingList = require('../modules/shopping-list-model');

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be empty!' });
  }

  const item = new ShoppingList({
    title: req.body.title,
    description: req.body.description,
    finished: req.body.finished ? req.body.finished : false
  });

  ShoppingList.create(item)
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      res.status(err.statusCode).send({
        message: err.message || 'Some error occurred while creating the Stock.'
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  ShoppingList.findById(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: 'Not found item with id ' + id });
      else res.status(200).send(data);
    })
    .catch((err) => {
      res.status(err.statusCode).send({ message: 'Error retrieving item with id=' + id });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { $regex: new RegExp(title), $options: 'i' } } : {};

  ShoppingList.find(condition)
    .then((data) => {
      if (!data) res.status(404).send({ message: 'Not found item with id ' + id });
      else res.status(200).send(data);
    })
    .catch((err) => {
      res.status(err.statusCode).send({ message: 'Error retrieving items' });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  ShoppingList.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found!`
        });
      } else res.status(200).send(data);
    })
    .catch((err) => {
      res.status(err.statusCode).send({
        message: 'Error updating Item with id=' + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  ShoppingList.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
        });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(err.statusCode).send({
        message: 'Could not delete Item with id=' + id
      });
    });
};

exports.deleteAll = (req, res) => {
  ShoppingList.deleteMany({})
    .then((data) => {
      res.status(200).send({
        message: `${data.deletedCount} items were deleted successfully!`
      });
    })
    .catch((err) => {
      res.status(err.statusCode).send({
        message: err.message || 'Some error occurred while removing all items.'
      });
    });
};

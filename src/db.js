const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = mongoose
  .connect(
      'your_uri',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = mongoose
  .connect(
    'mongodb+srv://dbadmin:GzB4v.BqzbGnjLw@smartpay-demo.18kmz.mongodb.net/smartpay-demo?retryWrites=true&w=majority',
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

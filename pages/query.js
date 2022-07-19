// const MongoClient = require('mongodb').MongoClient;
// const url =
//   'mongodb+srv://anaknits-website:mdEWY2quaJVqBwN@cluster0.8xuuc.mongodb.net/anaknits-website?retryWrites=true';

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db('anaknits-website');
//   var query = { name: '*' };
//   dbo
//     .collection('users')
//     .find(query)
//     .toArray(function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       db.close();
//     });
// });

import mongoose from 'mongoose';

const Person = mongoose.model('Person', orderSchema);

// find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
Person.findOne({ name: '*' }, 'name quantity', function (err, person) {
  if (err) return handleError(err);
  // Prints "Space Ghost is a talk show host".
  console.log('%s %s is a %s.', person.name, person.quantity);
});

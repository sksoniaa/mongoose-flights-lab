// THE PURPOSE OF THIS FILE
// is to create and export our object Model (which we use in our controllers)
// The model performs cruds operations on the movies collection in our movies database!
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
  },
  arrival: Date
}, {
  timestamps: true
})
// Enforces the shape of the documents (Think of objects)
// in our mongodb movies collection
const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN',
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999} ,
    departs: {
      type: Date,
      default: function () {
        const today = new Date();
        const oneYearFromNow = today.getFullYear() + 1
        today.setFullYear(oneYearFromNow)
        return today;
      }
    },
    destinations: [destinationSchema]
}, {
  timestamps: true
});
	


// Compile the schema into a model and export it
// Movie, creates a movies collection in our movies database
module.exports = mongoose.model('Flight', flightSchema);
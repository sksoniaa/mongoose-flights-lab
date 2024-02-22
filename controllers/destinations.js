const FlightModel = require('../models/flight')

module.exports = {
  create,
}

async function create(req, res) {
  try{
    const flightDocs = await FlightModel.findById(req.params.id)

    flightDocs.destinations.push(req.body)

    await flightDocs.save()

    res.redirect(`/flights/${req.params.id}`)
  } catch(err) {
    console.log(err);
    res.send(err)
  }
}


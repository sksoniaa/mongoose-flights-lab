const TicketModel = require('../models/ticket')
const FlightModel = require('../models/flight')

module.exports = {
  new: newTicket,
  create,
  addToTicketsList
}

async function addToTicketsList(req, res) {
  try{
    const flightDoc = await FlightModel.findById(req.params.flightId)
    flightDoc.ticketsList.push(req.body.ticketId)

    await flightDoc.save()

    res.redirect(`/flights/${req.params.flightId}`)
  } catch(err) {
    console.log(err);
    res.send(err)
  }
}

async function create(req, res) {
  try{
    const createdTicket = await TicketModel.create(req.body)
    console.log(createdTicket, " <- createdTicket")

    res.redirect('/tickets/new')

  } catch(err) {
    console.log(err);
    res.send(err)
  }
}

async function newTicket(req, res) {
  try{
    // get all the tickets from the database and assign it to a var
    const allTickets = await TicketModel.find({})
    res.render('tickets/new', {
      title: "Add Ticket",
      tickets: allTickets
    })
  } catch(err) {
    console.log(err);
    res.send(err)
  }
}
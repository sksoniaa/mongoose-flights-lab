const FlightModel = require('../models/flight');
const TicketModel = require('../models/ticket')

module.exports = {
  new:newFlight,
  create: create,
  index,
  show
}


async function show(req, res) {
  try{
    const flightFromTheDatabase = await FlightModel
                                        .findById(req.params.id)
                                        .populate('ticketsList')
                                        .exec()
    console.log(flightFromTheDatabase);


    const ticketsNotInTheFlight = await TicketModel.find({_id: {$nin: flightFromTheDatabase}})

    res.render('flights/show', {
      flight: flightFromTheDatabase,
      tickets: ticketsNotInTheFlight
    });
  } catch(err) {
    res.send(err)
  }
}


async function index(req, res) {
  	// then we want to send a ejs page with all the movies to the browser
	try {
		// We want our model to go to the database and get all the movies
		// .find({}) is mongoose model query method
		const flightDocumentsFromTheDB = await FlightModel.find({})
		console.log(flightDocumentsFromTheDB)
		// then we want to send a ejs page with all the movies to the browser
		// movies/index is looking in the views folder for the ejs page
		res.render('flights/index', {flightDocs: flightDocumentsFromTheDB})
		// movieDocs is now a variables inside of views/movies/index.ejs 
	} catch(err){
		console.log(err)
		res.redirect('/')
	}
}

function newFlight(req, res) {
  const newFlight = new FlightModel()
  const defaultDate = newFlight.departs.toISOString().slice(0, 16)
  res.render('flights/new', {defaultDate: defaultDate})
}

async function create(req, res){
  console.log(req.body, " <- is the contents of our form!")
  
	try {
    // await says wait for the model to finish going to mongodb
    // atlas and comiing back before you run the code after it
    
    // only use await on your model
		const flightFromTheDatabase = await FlightModel.create(req.body)
		// for now redirect to new page
		res.redirect(`/flights/${flightFromTheDatabase._id}`)
	} catch(err){
    console.log(err)
	  res.redirect("flights/new");
	}
}

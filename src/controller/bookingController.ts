import Booking from '../model/Booking';
import User from '../model/User';
import { Request, Response } from 'express';
import Route from '../model/Route';
import Point from '../model/Point';

const getBooking = async (req: Request, res: Response) => {
	const booking = await Booking.findById(req.params._id);
	if(!booking){
		return res.status(404).json("User not found")
	}
	res.json({booking}).status(200)

};

const cancelBooking = async (req: Request, res: Response) => {

	const cancel = await Booking.findByIdAndRemove(req.params.id);
	if(!cancel){
		return res.status(404).json("Can't remove something that doesn't exist")
	}
	res.json({cancel}).status(200)

	// const name = req.body.name;
	// const userID = req.body.user;
	// const findbooking = await Booking.findOne({ name, user: userID });
	// if (!findbooking) {
	// 	return res.status(400).json({ message: 'Booking not found' });
	// }
	// await Booking.findByIdAndDelete(findbooking._id);
	// res.status(200).json({ auth: true });
};


const getAll = async (req: Request, res: Response) => {

	const bookings = await Booking.find();
	// const bookings = await Booking.find().populate('user'); // No entenc pq serveix aixo de populate pero
	// serveix per obtenir només un booking
	res.json(bookings);
};

function subtractHours(date:Date, hours: number) {
	date.setHours(date.getHours() - hours);

	return date;
  }


const createBooking = async (req:Request, res: Response) => {
	const route = await Route.findById(req.body.route);
	const user = await User.findOne({name: req.body.userName});
	if(!user || !route){
		return res.json(user).status(404);
	}
	const price = req.body.price;
	/* const cancelPolicy = {
		completeRefound: {
			maxCancelDate: subtractHours(route.dateOfBeggining, 3),
			pirceRefound: price
		},
		halfRefound: {
			maxCancelDate: subtractHours(route.dateOfBeggining, 2),
			pirceRefound: price * 0.5
		},
		noRefound: {
			maxCancelDate: subtractHours(route.dateOfBeggining, 1),
			pirceRefound: 0
		}
	} */
	const selectedStopPoint = new Point({ name: req.body.selectedStopPoint});
	const booking = new Booking({route,user,price,selectedStopPoint});
	try{
		await booking.save();
		user?.booking.push(booking._id);
		await user?.save();
		route?.participants.push(user._id);
		await route?.save();
	}
	catch(err){
		return res.json(res).status(500);
	}

	return res.json({message: "Booking created",booking}).status(200);

}
const updateBooking = async (req: Request, res: Response) => {


  const _id = req.params.id;
  const user = await User.findOne({name: req.body.userName});
  const route = await Route.findOne({name: req.body.route});

  if(!user ||!route){
	return res.status(404).json("route of user no found");
  }
  const price=req.body.price;
  const selectedStopPoint=req.body.selectedStopPoint;
  const booking = await Booking.findByIdAndUpdate(req.params.id,{route,user, price,selectedStopPoint}, {new: true});
  return res.json({message: "Booking updated",booking}).status(200)

}

const getBookingsFromUser = async (req: Request, res: Response) => {
	const _id = req.params.id;
	// const bookings = await Booking.find(User.name: ) // ns com fer aixo
	// res.json(bookings);
}
export default {
	getBooking,
	cancelBooking,
	getAll,
	updateBooking,
	createBooking,
	getBookingsFromUser

};
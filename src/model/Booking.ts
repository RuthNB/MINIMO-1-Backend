import { Schema, model } from 'mongoose';

const Booking = new Schema({
	route: {
		type: Schema.Types.ObjectId,
		ref: "Route"
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	dayOfCreation: {type: Date, default: Date.now},
	price: Number,
	cancelPolicy:{
		completRefund:{
			maxCancelDate: Date,
			pirceRefound: Number
		},
		halfRefund: {
			maxCancelDate: Date,
			pirceRefound: Number
		},
		noRefund:{
			maxCancelDate: Date,
			pirceRefound: Number
		}
	},
	selectedStopPoint:{type: Schema.Types.ObjectId, ref: "Point"},
	gestor: {
		type: Schema.Types.ObjectId,
		ref: "Gestor"
	},
});

export default model('Booking', Booking);
import User from '../model/User';
import { Request, Response } from 'express';
import Point from '../model/Point';
import Vehicle from '../model/Vehicle';

const getVehicle = async (req: Request, res: Response) => {
	const vehicle = await Vehicle.findById(req.params._id);
	if(!vehicle){
		return res.status(404).json("Vehicle not found")
	}
	res.json({vehicle}).status(200)
};

const deleteVehicle = async (req: Request, res: Response) => {
	const cancel = await Vehicle.findByIdAndRemove(req.params.id);
	if(!cancel){
		return res.status(404).json("Can't remove something that doesn't exist")
	}
	res.json({cancel}).status(200)
};


const getAll = async (req: Request, res: Response) => {

	const vehicle = await Vehicle.find();
	res.json(vehicle);
};
const createVehicle = async (req:Request, res: Response) => {
	const vehicle2 = await Vehicle.findById(req.body.vehicle);
	if(vehicle2){
		return res.json(vehicle2).status(404);
	}
	const vehicle3 = new Vehicle({model: req.body.model, brand: req.body.brand, year: req.body.year, owner: req.body.owner, seats: req.body.seats, licencePlate: req.body.licencePlate });
	try{
		await vehicle3.save();
	}
	catch(err){
		return res.json(res).status(500);
	}

	return res.json({message: "Vehicle created",vehicle3}).status(200);

}

const updateVehicle = async (req: Request, res: Response) => {
    Vehicle.update({"_id": req.body._id}, {$set: {"model": req.body.model, "brand": req.body.brand, "year": req.body.year, "owner": req.body.owner, "seats": req.body.seats, "licencePlate": req.body.licencePlate}}).then((data) => { 
        res.status(201).json(data); 
    }).catch((err) => { 
        res.status(500).json(err); 
    }) 
}

export default {
	getVehicle,
	deleteVehicle,
	getAll,
	updateVehicle,
	createVehicle
};
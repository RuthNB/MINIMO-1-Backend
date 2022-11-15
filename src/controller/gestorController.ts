
import { Request, Response } from 'express';
import Booking from '../model/Booking';
import Gestor from '../model/Gestor';

const getGestor = async (req: Request, res: Response) => {
	const gestor = await Gestor.findById(req.params._id);
	if(!gestor){
		return res.status(404).json("Gestor not found.")
	}
	res.json({gestor}).status(200)
};

const deleteGestor = async (req: Request, res: Response) => {
	const cancel = await Gestor.findByIdAndRemove(req.params.id);
	if(!cancel){
		return res.status(404).json("Can't remove something that doesn't exist")
	}
	res.json({cancel}).status(200)
};

const getAll = async (req: Request, res: Response) => {

	const vehicle = await Gestor.find();
	res.json(vehicle);
};

const addGestor = async (req: Request, res: Response) => {
	const issue = req.body.issue;
	const description = req.body.description;
	const date = req.body.date;
	const newGestor = new Gestor({issue, description, date});
	await newGestor.save();
	res.status(200).json(newGestor);
};

const updateGestor = async (req: Request, res: Response) => {
    Gestor.update({"_id": req.body._id}, {$set: {"issue": req.body.issue, "description": req.body.description, "date": req.body.date}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
};

export default {
	getGestor,
	deleteGestor,
	getAll,
	updateGestor,
	addGestor
};
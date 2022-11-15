import { Schema, model } from 'mongoose';

const Gestor = new Schema({
	issue: Number,
	description: String,
    date: Date
});
export default model('Gestor', Gestor);
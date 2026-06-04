import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const taskSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		user: { type: Types.ObjectId, ref: 'User', required: true },
		status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
	},
	{ timestamps: true }
);

export default model('Task', taskSchema);


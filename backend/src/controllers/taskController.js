import Task from '../models/Task.js';

export async function createTask(req, res, next) {
	try {
		const { title, description } = req.validatedBody;
		const task = await Task.create({ title, description, user: req.user.id });
		return res.status(201).json({ success: true, data: task });
	} catch (err) {
		return next(err);
	}
}

export async function getTasks(req, res, next) {
	try {
		const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
		return res.json({ success: true, data: tasks });
	} catch (err) {
		return next(err);
	}
}

export async function getTask(req, res, next) {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) return res.status(404).json({ success: false, error: 'Not found' });
		if (task.user.toString() !== req.user.id) return res.status(403).json({ success: false, error: 'Forbidden' });
		return res.json({ success: true, data: task });
	} catch (err) {
		return next(err);
	}
}

export async function updateTask(req, res, next) {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) return res.status(404).json({ success: false, error: 'Not found' });
		if (task.user.toString() !== req.user.id) return res.status(403).json({ success: false, error: 'Forbidden' });
		const updates = req.validatedBody;
		Object.assign(task, updates);
		await task.save();
		return res.json({ success: true, data: task });
	} catch (err) {
		return next(err);
	}
}

export async function deleteTask(req, res, next) {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) return res.status(404).json({ success: false, error: 'Not found' });
		if (task.user.toString() !== req.user.id) return res.status(403).json({ success: false, error: 'Forbidden' });
		await Task.findByIdAndDelete(req.params.id);
		return res.json({ success: true, data: null });
	} catch (err) {
		return next(err);
	}
}


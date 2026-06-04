import Task from '../models/Task.js';

function successRes(res, data = null, message = 'OK', status = 200) {
	return res.status(status).json({ success: true, message, data });
}

function errorRes(res, message = 'Error', status = 400) {
	return res.status(status).json({ success: false, message });
}

export async function createTask(req, res, next) {
	try {
		const { title, description } = req.validatedBody;
		const task = await Task.create({ title, description, user: req.user.id });
		return successRes(res, task, 'Task created', 201);
	} catch (err) {
		return next(err);
	}
}

export async function getTasks(req, res, next) {
	try {
		const { search, status, page = 1, limit = 10 } = req.query;

		const filter = { user: req.user.id };

		if (status === 'completed') filter.status = 'completed';
		if (status === 'pending') filter.status = 'pending';

		if (search) {
			filter.title = { $regex: search, $options: 'i' };
		}

		const pageNum = Math.max(parseInt(page, 10) || 1, 1);
		const limitNum = Math.max(parseInt(limit, 10) || 1, 1);
		const skip = (pageNum - 1) * limitNum;

		const [filteredTotal, overallTotal, completedCount] = await Promise.all([
			Task.countDocuments(filter),
			Task.countDocuments({ user: req.user.id }),
			Task.countDocuments({ user: req.user.id, status: 'completed' }),
		]);

		const tasks = await Task.find(filter)
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limitNum);

		const totalPages = Math.ceil(filteredTotal / limitNum) || 1;

		return successRes(res, { tasks, meta: { page: pageNum, limit: limitNum, total: filteredTotal, totalPages, overallTotal, completedCount, pendingCount: overallTotal - completedCount } }, 'Tasks fetched');
	} catch (err) {
		return next(err);
	}
}

export async function getTask(req, res, next) {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) return errorRes(res, 'Not found', 404);
		if (task.user.toString() !== req.user.id) return errorRes(res, 'Forbidden', 403);
		return successRes(res, task, 'Task fetched');
	} catch (err) {
		return next(err);
	}
}

export async function updateTask(req, res, next) {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) return errorRes(res, 'Not found', 404);
		if (task.user.toString() !== req.user.id) return errorRes(res, 'Forbidden', 403);
		const updates = req.validatedBody;
		Object.assign(task, updates);
		await task.save();
		return successRes(res, task, 'Task updated');
	} catch (err) {
		return next(err);
	}
}

export async function deleteTask(req, res, next) {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) return errorRes(res, 'Not found', 404);
		if (task.user.toString() !== req.user.id) return errorRes(res, 'Forbidden', 403);
		await Task.findByIdAndDelete(req.params.id);
		return successRes(res, null, 'Task deleted');
	} catch (err) {
		return next(err);
	}
}

export async function toggleTaskStatus(req, res, next) {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) return errorRes(res, 'Not found', 404);
		if (task.user.toString() !== req.user.id) return errorRes(res, 'Forbidden', 403);
		task.status = task.status === 'completed' ? 'pending' : 'completed';
		await task.save();
		return successRes(res, task, 'Task status toggled');
	} catch (err) {
		return next(err);
	}
}


import User from '../models/User.js';

export async function getUsers(req, res, next) {
	try {
		const users = await User.find().select('-password').sort({ createdAt: -1 });
		return res.json({ success: true, data: users });
	} catch (err) {
		return next(err);
	}
}

export async function deleteUser(req, res, next) {
	try {
		const user = await User.findById(req.params.id);
		if (!user) return res.status(404).json({ success: false, error: 'Not found' });
		await User.findByIdAndDelete(req.params.id);
		return res.json({ success: true, data: null });
	} catch (err) {
		return next(err);
	}
}


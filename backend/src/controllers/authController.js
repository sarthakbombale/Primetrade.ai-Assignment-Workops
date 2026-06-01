import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function register(req, res, next) {
	try {
		const { name, email, password } = req.validatedBody;
		const exists = await User.findOne({ email });
		if (exists) return res.status(400).json({ success: false, error: 'Email already in use' });
		const hashed = await bcrypt.hash(password, 10);
		const user = await User.create({ name, email, password: hashed });
		const { password: _p, ...rest } = user.toObject();
		return res.status(201).json({ success: true, data: rest });
	} catch (err) {
		return next(err);
	}
}

export async function login(req, res, next) {
	try {
		const { email, password } = req.validatedBody;
		const user = await User.findOne({ email }).select('+password');
		if (!user) return res.status(400).json({ success: false, error: 'Invalid credentials' });
		const match = await bcrypt.compare(password, user.password);
		if (!match) return res.status(400).json({ success: false, error: 'Invalid credentials' });
		const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
		const { password: _p, ...rest } = user.toObject();
		return res.json({ success: true, token, data: rest });
	} catch (err) {
		return next(err);
	}
}


export default function validate(schema) {
	return (req, res, next) => {
		try {
			const parsed = schema.parse(req.body);
			req.validatedBody = parsed;
			return next();
		} catch (err) {
			return res.status(400).json({ success: false, error: err.errors || err.message });
		}
	};
}


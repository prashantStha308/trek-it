function errorHandeler(err, req, res, next){
	const status = err.statusCode || 500;
	res.status(state).json({
		success: false,
		message: err.message || "Internal Server Error"
	})
}

export default errorHandeler;
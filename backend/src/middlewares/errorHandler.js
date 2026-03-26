export const errorHandler = (err, req, res, next) => {
	const status = err.statusCode || 500;
	res.status(status).json({
		success: false,
		message: err.message || "Internal Server Error"
	})
}

export const chatAsyncHandler = (socket, fn) => async (data) => {
    try {
    	await fn(data);
    } catch(err) {
    	console.log("Error occured", err);
        socket.emit("chat:error", { message: err.message });
    }
}
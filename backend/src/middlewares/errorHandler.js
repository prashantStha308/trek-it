export const errorHandler = (err, req, res, next) => {
	const status = err.statusCode || 500;
	res.status(status).json({
		success: false,
		message: err.message || "Internal Server Error"
	})
}

export const chatAsyncHandler = (socket, fn) => async (data) => {
    try {
    	console.log("running func");
    	await fn(data);

    	console.log("func has executed");
    } catch(err) {
    	console.log("Error occured", err);
        socket.emit("chat:error", { message: err.message });
    }
}
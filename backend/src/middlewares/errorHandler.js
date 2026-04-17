const isDev = process.env.NODE_ENV === "development";

export const errorHandler = (err, req, res, next) => {
	const status = err.statusCode || 500;

	console.error("Status: ", status);
	console.error("Message: ", err.message);
	console.error("Errors: ", err.errors);
	console.error("Stack:", err.stack);

	res.status(status).json({
		success: false,
		message: err.message || "Internal Server Error",
		errors: err.errors || [],
		...(isDev && { stack: err.stack })
	})
}

export const socketErrorHandler = (socket, fn) => async (data) => {
    try {
    	await fn(data);
    } catch(err) {
    	console.log("Error occured", err);
        socket.emit("socket:error", { message: err.message });
    }
}
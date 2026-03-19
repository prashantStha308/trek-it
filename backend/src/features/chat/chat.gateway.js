export default function chatGateway(io, socket) {
    const user = socket.data.user;

    const joinChat = (chatId) => {
        socket.join(chatId);
        console.log(`Socket ${socket.id}, User: ${user._id} joined Chat: ${chatId}`);
    };

    const leaveChat = (chatId) => {
        socket.leave(chatId);
        console.log(`Socket ${socket.id}, User: ${user._id} left Chat: ${chatId}`);
    };

    const handleDisconnect = () => {
        console.log(`Socket ${socket.id} disconnected`);
        io.to(chatId).emit("user:disconnect", user._id);
    };

    const emitToChat = (chatId, event, data) => {
        io.to(chatId).emit(event, data);
    };

    const emitToSocket = (event, data) => {
        socket.emit(event, data);
    };

    return {
        joinChat,
        leaveChat,
        handleDisconnect,
        emitToChat,
        emitToSocket,
    };
}
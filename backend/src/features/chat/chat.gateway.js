export default function chatGateway(io, socket) {
    const user = socket.data.user;

    const joinChat = (chatId) => {
        socket.join(chatId);
        socket.data.currentChat = chatId;
        console.log(`Socket ${socket.id}, User: ${user._id} joined Chat: ${chatId}`);
    };

    const leaveChat = () => {
        socket.leave(chatId);
        socket.data.currentChat = null;
        console.log(`Socket ${socket.id}, User: ${user._id} left Chat: ${chatId}`);
    };

    const handleDisconnect = () => {
        console.log(`Socket ${socket.id} disconnected`);
        io.to(chatId).emit("user:disconnect", user._id);
    };

    const emitToChat = ( event, data) => {
        io.to(socket.data.currentChat).emit(event, data);
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
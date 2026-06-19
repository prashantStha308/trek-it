export default function chatGateway(io, socket) {
    const user = socket.data.user;

    const joinChat = (chat) => {
        socket.join(chat._id.toString());
        socket.data.currentChat = chat;
        console.log(`Socket ${socket.id.toString()}, User: ${user._id} joined Chat: ${chat._id}`);
    };

    const leaveChat = () => {
        socket.leave(socket.data.currentChat._id);
        socket.data.currentChat = null;
        console.log(`Socket ${socket.id}, User: ${user._id} left Chat: ${chat._id}`);
    };

    const handleDisconnect = () => {
        console.log(`Socket ${socket.id} disconnected`);
        io.to(chat._id).emit("user:disconnect", user._id);
    };

    const emitToChat = (event, data) => {
        io.to(socket.data.currentChat._id.toString()).emit(event, data);
    };

    const emitToSocket = (event, data) => {
        socket.emit(event, data);
    };

    const getAllActiveUserIds = async ()=>{
        const socketsInRoom = await io.in(chat._id.toString()).fetchSockets();
        const activeUserIds = socketsInRoom.map(s => s.data.user._id);

        return activeUserIds;
    }


    return {
        joinChat,
        leaveChat,
        handleDisconnect,
        emitToChat,
        emitToSocket,
        getAllActiveUserIds
    };
}
import { Notification } from "../../models/index.js";

export default function notificationHandler(io, socket) {
    const user = socket.data.user;

    const handleRead = async (notificationId) => {
        const notif = await Notification.findOne({ _id: notificationId, recipient: user._id });

        if (!notif) throw new Error("Notification not found");

        notif.isRead = true;
        await notif.save();

        socket.emit("notification:read", { notificationId: notif._id })
    }

    const handleReadAll = async () => {
        await Notification.updateMany(
            { recipient: user._id, isRead: false },
            { $set: { isRead: true } }
        );

        socket.emit("notification:readAll", null)
    }

    return {
        handleRead,
        handleReadAll
    }
}
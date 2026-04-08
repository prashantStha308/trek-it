import { Notification } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";
import { getIo } from "../../utils/io.socket.js";

// use this function to set notification to user

/**
 * @description emits an event AND sends a newly created notification
 * 
 * @param {String} event - Event to emit via socket 
 * @param {String} recipient - Receiving user's ObjectId 
 * @param {Object} [content]
 * @param {String} [content.title] - Title of the notification 
 * @param {String} [content.message] - Notification message
 * @param {String} [content.link] - Link to redirect user
 * @param {Object} [content.meta] - metadata to the message. Can have ObjectIds to different models for example   
 * @returns {Promise<Object>} - Notification document
 */
export const sendNotificationService = async (event, recipient, {
    title, message="", link = "", meta = {}
}) => {
    const io = getIo();

    console.log("emitting event:", event, "to:", recipient.toString());

    const notification = await Notification.create({
        recipient,
        title,
        message,
        link,
        meta
    })

    io.to(recipient.toString()).emit(event, {notification});
    return notification;
}


export const deleteNotificationService = async (notificationId, recipient) => {
    const io = getIo();

    const notification = await Notification.deleteOne({
        _id: notificationId,
        recipient
    });

    if (notification.deletedCount === 0) {
        throw new ApiError(404, "Notification not found");
    }

    io.to(recipient.toString()).emit("notification:deleted", { notificationId });
    return notification
}


export const deleteBulkNotificationService = async (recipient, {
    amount = 10,
    order = "latest", // "latest" | "oldest"
} = {}) => {

    const filter = { recipient };

    const sort = order === "latest" ? { createdAt: -1 } : { createdAt: 1 };

    const notifications = await Notification.find(filter)
        .sort(sort)
        .limit(amount)
        .select("_id")
        .lean();

    const ids = notifications.map(notif => notif._id);
    const result = await Notification.deleteMany({ _id: { $in: ids } });

    const io = getIo();

    io.to(recipient.toString()).emit("notification:bulkDeleted", { deletedCount: result.deletedCount });

    return result;
}
import { Notification } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";
import { getIo } from "../../utils/io.socket.js";

// use this function to set notification to user

/**
 * @description emits an event AND sends a newly created notification
 * 
 * @param {String} event - Event to emit via socket 
 * @param {String} recipientId - Receiving user's ObjectId 
 * @param {Object} [content]
 * @param {String} [content.title] - Title of the notification 
 * @param {String} [content.message] - Notification message
 * @param {String} [content.link] - Link to redirect user
 * @param {Object} [content.meta] - metadata to the message. Can have ObjectIds to different models for example   
 * @returns {Promise<Object>} - Notification document
 */
export const sendNotificationService = async (event, recipientId, {
        title, message="", link = "", actions=[], meta = {}, priority=0
    },
    persist=true
) => {
    const io = getIo();
    const finalEvent = `notification:${event}`;

    let notification = {
        recipientId,
        title,
        message,
        link,
        actions,
        meta: {...meta, finalEvent}
    }

    if(persist){
        notification = await Notification.create( notification );
    }

    // sends to client, but if offline, this fires nothing, but notificaiton is persisted in db
    io.to(recipientId.toString()).emit(finalEvent, notification);
    
    return notification;
}


/**
 * @description - Broadcasts a notification to multiple recipients.
 * 
 * @param {String} event - Event to emit via socket 
 * @param {String[]} recipientIds - Array of recipient user ObjectIds
 * @param {Object} content
 * @param {string} content.title - Title of the notification
 * @param {string} [content.message=""] - Notification message
 * @param {string} [content.link=""] - Optional redirect link
 * @param {Object} [content.meta={}] - Additional metadata. For example, can have objectId of related datas 
 * @returns {Promise<Object[]>} Array of created notification documents
 * 
 * @example await broadcastNotificationService("bookingCancelled", [guideId, touristId], {title: "Booking cancelled", message: "A booking has been cancelled ", meta:{ guideId, touristId, packageId, bookingId }})
 * 
 */
export const broadcastNotificationService = async (event, recipientIds = [], {
    title, message = "", link = "", actions =[], meta = {}, priority=0, persist = true
}) => {
    const notifications = await Promise.all(
        recipientIds.map(recipientId =>
            sendNotificationService(event, recipientId, { title, message, link, actions, meta }, persist)
        )
    );

    return notifications;
}

export const deleteNotificationService = async (notificationId, recipientId) => {
    const io = getIo();

    const notification = await Notification.deleteOne({
        _id: notificationId,
        recipientId
    });

    if (notification.deletedCount === 0) {
        throw new ApiError(404, "Notification not found");
    }

    io.to(recipientId.toString()).emit("notification:deleted", { notificationId });
    return notification
}


export const deleteBulkNotificationService = async (recipientId, {
    amount = 10,
    order = "latest", // "latest" | "oldest"
} = {}) => {

    const filter = { recipient: recipientId };

    const sort = order === "latest" ? { createdAt: -1 } : { createdAt: 1 };

    const notifications = await Notification.find(filter)
        .sort(sort)
        .limit(amount)
        .select("_id")
        .lean();

    const ids = notifications.map(notif => notif._id);
    const result = await Notification.deleteMany({ _id: { $in: ids } });

    const io = getIo();

    io.to(recipientId.toString()).emit("notification:bulkDeleted", { deletedCount: result.deletedCount });

    return result;
}
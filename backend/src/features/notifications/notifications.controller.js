import { Notification } from "../../models/index.js";
import { getAll } from "../../utils/crud.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import {
    deleteNotificationService,
    deleteBulkNotificationService
} from "./notifications.service.js";

export const getAllNotifications = async (req, res) => {

    const user = req.user;
    // TODO: validate filter later
    const { limit, page, sort = -1, ...filter } = req.query;

    const notifications = await getAll(Notification, {
        limit, page,
        sort: {createdAt: Number(sort)},
        filter: {
            ...filter,
            recipient: user._id
        }
    });

    return ApiResponse.success(res, {
        data: notifications,
        message: "Retrieved all notifications"
    })
}

export const deleteNotification = async (req, res) => {
    const user = req.user;
    const notificationId = req.params.notificationId;

    const notification = await deleteNotificationService(notificationId, user._id)

    return ApiResponse.success(res, {
        data: notification,
        message: "Notification deleted successfully"
    })
}

export const deleteBulkNotification = async (req, res) => {
    const { amount, order } = req.query;

    const notifications = await deleteBulkNotificationService(req.user._id, {
        amount: Math.max(5, Math.ceil(amount)),
        order: order || "latest"
    });

    return ApiResponse.success(res, {
        data: notifications,
        message: `Successfully deleted ${notifications.deletedCount} notifications in order: ${order}`
    });
}
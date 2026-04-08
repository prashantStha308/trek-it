import express from "express";
import {
    getAllNotifications,
    deleteNotification,
    deleteBulkNotification
} from "./notifications.controller.js";


const notificationR = express.Router();

notificationR.get("/", getAllNotifications);

notificationR.delete("/", deleteBulkNotification);
notificationR.delete("/:notificationId", deleteNotification);

export { notificationR };
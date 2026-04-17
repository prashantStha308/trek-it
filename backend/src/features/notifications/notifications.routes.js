import express from "express";
import {
    getAllNotifications,
    deleteNotification,
    deleteBulkNotification
} from "./notifications.controller.js";
import { authorize } from "../../middlewares/authorize.js";

const notificationR = express.Router();

notificationR.get("/", authorize(), getAllNotifications);

notificationR.delete("/", authorize(), deleteBulkNotification);
notificationR.delete("/:notificationId", authorize(), deleteNotification);

export { notificationR };
import mongoose from "mongoose";
import {requiredError} from "../../utils/model.helper.js";

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, ()=> requiredError("notification.recipient")]
    },
    title: {
        type: String,
        required: [true, ()=> requiredError("notification.type")]
    },
    message: {
        type: String,
        required: [true, ()=> requiredError("notification.message")]
    },
    link: {
        type: String,
        default: ""
    },
    isRead: {
        type: Boolean,
        default: false
    },
    meta: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, { timestamps: true });

export const Notification = mongoose.model('Notification', notificationSchema);
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
        required: [true, ()=> requiredError("notification.title")]
    },
    message: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        default: ""
    },
    actions: {
        type: [{
            label: String,
            href: String,
            args: [String],

        }],
        default: []
    },
    isRead: {
        type: Boolean,
        default: false
    },
    priority:{
        type: Number,
        default: 0,
        enum: {
            values: [-1, 0 , 1],
            message: "Notification.priority can only be [-1,0,1]"
        }
    },
    meta: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, { timestamps: true });

export const Notification = mongoose.model('Notification', notificationSchema);
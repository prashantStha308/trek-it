import { body, query } from 'express-validator';

import { User } from '../../models/index.js';
import { CHAT_TYPES } from './constants.validation.js';
import { mongoIdParam } from './validation.helpers.js';
import { validateBasicQuery } from "./user.validation.js";

const validateUser = async (participants) => {

    // This is done to avoid duplication
    const unique = new Set(participants);
    if (unique.size !== participants.length) {
        throw new Error('participants must be unique');
    }

    // Ensure that the users exists
    const users = await User.find({ _id: { $in: participants } })
    if (users.length !== participants.length) {
        throw new Error('One or more users do not exist');
    }

    return true;
}

export const validateChatBody = [
    body('participants').isArray({ min: 2 }).withMessage("chat must have a minimum of 2 participants"),
    body('participants.*').optional().isMongoId().bail().custom(validateUser),
    body('type').notEmpty().trim().isIn(CHAT_TYPES)

];

export const validateChatQuery = [
    ...validateBasicQuery,
    query('participant').optional().isMongoId(),
    query('type').optional().isIn(CHAT_TYPES),
];

export const validateChatParams = mongoIdParam('chatId');
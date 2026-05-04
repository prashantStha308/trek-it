import mongoose from "mongoose";

import {
    Package,
    Guide
} from "../../models/index.js";


export const getMetaService = async (field, models = [Package, Guide], {sort = -1, limit = 10, page = 1}) => {
    
    const aggregateArray = [
        { $unwind: `$${field}` },
        { $group: { _id: `$${field}`, count: { $sum: 1 } } },
        { $sort: { count: sort } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        { $project: { _id: false, [field]: "$_id" } }
    ];

    const results = await Promise.all(models.map(model => model.aggregate(aggregateArray)));
    const merged = results.flatMap(result => result.map(item => item[field]));

    return [...new Set(merged)];
}
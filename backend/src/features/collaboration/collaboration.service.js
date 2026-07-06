import {
    CollabRequest,
    Package,
    Guide
} from "../../models/index.js";

import ApiError from "../../utils/ApiError.js";

import { getAll } from "../../utils/crud.service.js";
import { sendNotificationService } from "../notifications/notifications.service.js";

const POPULATE_GUIDE = {
    path: "guide",
    select: "_id name profilePicture gender age role"
}

export const getCollabRequestsService = async (user, { limit, page } = {}) => {
    const ownedPackages = await Package.find({ guide: user._id }).select("_id").lean();
    const packageIds = ownedPackages.map((ownedPackage) => ownedPackage._id);

    return await getAll(CollabRequest, {
        limit,
        page,
        filter: { package: { $in: packageIds } },
        populate: [
            POPULATE_GUIDE,
            { path: "package", select: "name thumbnail" },
        ],
    });
};

export const getMyCollabRequestsService = async (user, { limit, page } = {}) => {
    return await getAll(CollabRequest, {
        limit,
        page,
        filter: { guide: user._id },
        populate: [
            { path: "package", select: "name thumbnail regions daysAlloted guide" },
        ],
    });
};

export const getCollaboratingPackagesService = async (user) => {
    const guideProfile = await Guide.findById(user._id)
        .populate({
            path: "collaborations",
            select: "name thumbnail regions daysAlloted guide isActive"
        })
        .lean();
    if (!guideProfile) throw new ApiError(404, "Guide not found");
    return guideProfile.collaborations;
};


export const createCollabRequestService = async (user, body) => {
    const { packageId, description } = body;

    const targetPackage = await Package.findById(packageId).populate(POPULATE_GUIDE);
    if (!targetPackage) throw new ApiError(404, "Package not found");

    // can't collab on your own package
    if (targetPackage.guide.toString() === user._id.toString()) {
        throw new ApiError(400, "You cannot request to collaborate on your own package");
    }

    const alreadyCollaborator = targetPackage.collaborators
        .some((collaboratorId) => collaboratorId.toString() === user._id.toString());
    if (alreadyCollaborator) {
        throw new ApiError(400, "You are already a collaborator on this package");
    }

    const existingRequest = await CollabRequest.exists({
        package: packageId,
        guide: user._id,
        status: "pending",
    });
    if (existingRequest) {
        throw new ApiError(400, "You already have a pending request for this package");
    }

    const request = await CollabRequest.create({
        package: packageId,
        guide: user._id,
        description,
    });

    await sendNotificationService("collabRequest", targetPackage.guide, {
        title: "New collaboration request",
        message: `${user.name} wants to collaborate on ${targetPackage.name}`,
        link: `/explore/packages/${packageId}`,
        meta: {
            requestId: request._id,
            guideId: user._id,
            guideName: user.name,
            packageId: targetPackage._id,
            packageName: targetPackage.name,
        },
    });

    return request;
};

export const acceptCollabRequestService = async (requestId, user) => {
    const request = await CollabRequest.findById(requestId).populate([
        { path: "package", select: "_id name guide" },
        , POPULATE_GUIDE,
    ]);

    if (!request) throw new ApiError(404, "Collab request not found");

    if (request.package.guide.toString() !== user._id.toString()) {
        throw new ApiError(403, "Only the package owner can accept collaboration requests");
    }

    if (request.status !== "pending") {
        throw new ApiError(400, `Request is already ${request.status}`);
    }

    request.status = "accepted";
    await request.save();

    let promises = [];

    promises.push(
        Package.findByIdAndUpdate(request.package._id, {
            $addToSet: { collaborators: request.guide },
        })
    )

    promises.push(
        Guide.findByIdAndUpdate(request.guide, {
            $addToSet: { collaborations: request.package._id },
        })
    )

    await Promise.all(promises);

    await sendNotificationService("collabAccepted", request.guide, {
        title: "Collaboration request accepted",
        message: `Your request to collaborate on ${request.package.name} was accepted`,
        link: `/explore/packages/${request.package._id}`,
        meta: {
            requestId: request._id,
            packageId: request.package._id,
            packageName: request.package.name,
        },
    });

    return request;
};

export const rejectCollabRequestService = async (requestId, user) => {
    const request = await CollabRequest.findById(requestId).populate("package");
    if (!request) throw new ApiError(404, "Collab request not found");

    if (request.package.guide.toString() !== user._id.toString()) {
        throw new ApiError(403, "Only the package owner can reject collaboration requests");
    }

    if (request.status !== "pending") {
        throw new ApiError(400, `Request is already ${request.status}`);
    }

    request.status = "rejected";
    await request.save();

    await sendNotificationService("collabRejected", request.guide, {
        title: "Collaboration request rejected",
        message: `Your request to collaborate on ${request.package.name} was not accepted`,
        meta: {
            requestId: request._id,
            packageId: request.package._id,
            packageName: request.package.name,
        },
    });

    return request;
};

export const withdrawCollabRequestService = async (requestId, user) => {
    const request = await CollabRequest.findOne({
        _id: requestId,
        guide: user._id,
        status: "pending",
    });

    if (!request) {
        throw new ApiError(404, "Pending collab request not found");
    }

    await request.deleteOne();
    return request;
};
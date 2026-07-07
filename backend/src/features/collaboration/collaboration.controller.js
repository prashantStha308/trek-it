import ApiResponse from "../../utils/ApiResponse.js";
import {
    getCollabRequestsService,
    getMyCollabRequestsService,
    getCollaboratingPackagesService,

    createCollabRequestService,
    
    acceptCollabRequestService,
    rejectCollabRequestService,
    
    withdrawCollabRequestService,
} from "./collaboration.service.js";


export const getCollabRequests = async (req, res) => {
    const { limit, page } = req.query;
    const requests = await getCollabRequestsService(req.user, { limit, page });

    return ApiResponse.success(res, {
        data: requests,
        message: "Collab requests retrieved successfully",
    });
};

export const getMyCollabRequests = async (req, res) => {
    const { limit, page } = req.query;
    const requests = await getMyCollabRequestsService(req.user, { limit, page });

    return ApiResponse.success(res, {
        data: requests,
        message: "Your collab requests retrieved successfully",
    });
};

export const getCollaboratingPackages = async (req, res) => {
    const packages = await getCollaboratingPackagesService(req.user);
  
    return ApiResponse.success(res, {
        data: packages,
        message: "Collaborating packages retrieved successfully",
    });
};

export const createCollabRequest = async (req, res) => {
    const request = await createCollabRequestService(req.user, req.body);

    return ApiResponse.success(res, {
        data: request,
        message: "Collab request sent successfully",
    }, 201);
};

export const acceptCollabRequest = async (req, res) => {
    const request = await acceptCollabRequestService(req.params.requestId, req.user);

    return ApiResponse.success(res, {
        data: request,
        message: "Collab request accepted",
    });
};

export const rejectCollabRequest = async (req, res) => {
    const request = await rejectCollabRequestService(req.params.requestId, req.user);

    return ApiResponse.success(res, {
        data: request,
        message: "Collab request rejected",
    });
};

export const withdrawCollabRequest = async (req, res) => {
    await withdrawCollabRequestService(req.params.requestId, req.user);

    return ApiResponse.success(res, {
        data: null,
        message: "Collab request withdrawn",
    });
};
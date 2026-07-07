import ApiResponse from "../../utils/ApiResponse.js";
import {
    createCustomRequestService,
    getMyCustomRequestsService,
    acceptCustomRequestService,
    rejectCustomRequestService,
    withdrawCustomRequestService,
} from "./customRequests.service.js";

export const createCustomRequest = async (req, res) => {
    const result = await createCustomRequestService(req.user, req.body);

    return ApiResponse.success(res, {
        status: 201,
        data: result,
        message: "Customization request sent to the guide successfully",
    });
};

export const getMyCustomRequests = async (req, res) => {
    const { limit, page } = req.query;
    const requests = await getMyCustomRequestsService(req.user, { limit, page });

    return ApiResponse.success(res, {
        data: requests,
        message: "Custom requests retrieved successfully",
    });
};

export const acceptCustomRequest = async (req, res) => {
    const request = await acceptCustomRequestService(req.params.requestId, req.user);

    return ApiResponse.success(res, {
        data: request,
        message: "Custom request accepted",
    });
};

export const rejectCustomRequest = async (req, res) => {
    const request = await rejectCustomRequestService(req.params.requestId, req.user);

    return ApiResponse.success(res, {
        data: request,
        message: "Custom request rejected",
    });
};

export const withdrawCustomRequest = async (req, res) => {
    await withdrawCustomRequestService(req.params.requestId, req.user);

    return ApiResponse.success(res, {
        data: null,
        message: "Custom request withdrawn",
    });
};

import express from "express";
import { authorize } from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.middleware.js";
import {
    getCollabRequests,
    getMyCollabRequests,
    getCollaboratingPackages,

    createCollabRequest,
    acceptCollabRequest,
    
    rejectCollabRequest,
    withdrawCollabRequest,
} from "./collaboration.controller.js";

const collabRequestR = express.Router();


collabRequestR.get("/", authorize(["guide", "admin"]), getCollabRequests);
collabRequestR.get("/mine", authorize(["guide"]), getMyCollabRequests);
collabRequestR.get("/packages", authorize(["guide"]), getCollaboratingPackages);

collabRequestR.post("/", authorize(["guide"]), createCollabRequest);

collabRequestR.patch("/:requestId/accept", authorize(["guide"]), acceptCollabRequest);
collabRequestR.patch("/:requestId/reject", authorize(["guide"]), rejectCollabRequest);

collabRequestR.delete("/:requestId", authorize(["guide"]), withdrawCollabRequest);

export { collabRequestR };
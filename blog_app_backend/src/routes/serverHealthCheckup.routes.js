import { Router } from "express";
import { serverHealthCheck } from "../controllers/serverHealthCheckup.controller.js";

const router = Router();

router.route("/healthcheck").get(serverHealthCheck);

export default router;
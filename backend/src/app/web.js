import express from "express";
import cors from "cors";

import publicApi from "../route/public-api.js";
import api from "../route/api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express();
web.use(express.json());
web.use(cors());

// user route
web.use(publicApi);
web.use(api);

// error middleware
web.use(errorMiddleware);

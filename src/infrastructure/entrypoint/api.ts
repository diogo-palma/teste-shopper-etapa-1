import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import { ErrorHandling } from "../../application/middleware/error-handling";
import container from '../config/ioc-container';
import path from 'path';

const asyncHandler = fn => (req, res, next) => {
  return Promise
    .resolve(fn(req, res, next))
    .catch((error) => {
      ErrorHandling.execute(error, req, res, next)
    });
};

const api = express();

api.use(express.static(path.join(__dirname, '..', '..', '..', 'public')));
api.use(cors({ origin: true }));
api.use(bodyParser.json());

const router = express.Router();
api.use("/", router);

router.post("/upload", asyncHandler((req, res) => container.get('llm').upload(req, res)));
router.patch("/confirm", asyncHandler((req, res) => container.get('llm').confirm(req, res)));
router.get("/:customer_code/list", asyncHandler((req, res) => container.get('llm').listReadings(req, res)));

export default api;


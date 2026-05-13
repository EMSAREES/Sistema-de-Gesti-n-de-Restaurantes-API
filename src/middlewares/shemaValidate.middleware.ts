import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";
import { HTTP_STATUS_CODES } from "../constants/stateCodes";

export const schemaValidation =
(schema: ZodSchema) => // Usamos ZodSchema que es más genérico y seguro
(req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json(
                error.issues.map((issue) => ({
                    // path: issue.path,
                    code: HTTP_STATUS_CODES.BAD_REQUEST,
                    message: issue.message,
                }))
            );
        }
        return res.status(500).json({code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, message: "Internal server error" });
    }
};
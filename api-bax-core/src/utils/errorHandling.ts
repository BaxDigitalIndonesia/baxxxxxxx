import { Response } from "express";

class ErrorHandler {
    /**
     * Handles an error that has occurred in the application.
     * @param res - The response object to use for sending the error response.
     * @param error - The error object to handle.
     * @param customMessage - An optional custom error message to include in
     *   the response. If not provided, a generic error message is used.
     * @returns The response object with the error response sent.
     */
    handle(res: Response, error: unknown, customMessage?: string): Response {
        console.error("Error occurred:", error);

        if (error instanceof Error) {
            return res.status(500).json({
                message: customMessage || "Something went wrong",
                error: error.message,
            });
        }

        return res.status(500).json({
            message: customMessage || "Internal Server Error",
            error: "Unknown error occurred",
        });
    }
}

export default new ErrorHandler();

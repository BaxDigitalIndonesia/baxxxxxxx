import { NextResponse } from "next/server";

class ErrorHandler {
  /**
   * Handles an error that has occurred in the application.
   * @param res - The response object to use for sending the error response.
   * @param error - The error object to handle.
   * @param customMessage - An optional custom error message to include in
   *   the response. If not provided, a generic error message is used.
   * @returns The response object with the error response sent.
   */
  handle(error: unknown, customMessage?: string): NextResponse {
    console.error("Error occurred:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: customMessage },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        error: "Unknown error occurred",
        message: customMessage || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export default new ErrorHandler();

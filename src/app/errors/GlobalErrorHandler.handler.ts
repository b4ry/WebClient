import { ErrorHandler } from "@angular/core";

import { DbError } from "./DbError.error";

export class GlobalErrorHandler extends ErrorHandler {
    public handleError(error: any): void {

        if (error instanceof DbError) {
            console.info(`[DbError]:${error.toString()}`);
        } else {
            super.handleError(error);
        }
    }
}
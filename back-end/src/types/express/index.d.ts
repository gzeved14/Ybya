import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            auth?: {
                lojaId: string;
                userId: string;
                email: string;
            };
        }
    }
}
import { IMiddleware } from './middleware.interface';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export interface CustomRequest extends Request {
	user: string | JwtPayload;
}

export interface CustomPayload {
	email: string;
}

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			try {
				const decoded = verify(req.headers.authorization.split(' ')[1], this.secret);
				(req as CustomRequest).user = (decoded as CustomPayload).email;
				next();
			} catch (err) {
				next();
			}
		} else {
			next();
		}
	}
}

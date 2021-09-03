// This file creates a identification middleware

// Importing token genrator and request properties
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Manage the access thanks to the given token from the Authorization header
const tokenReader = (req: Request, res: Response, next: NextFunction):void => {
	try {
		// Getting the identification token from the Authorization header
		const authorizationHeader = req.headers.authorization as string;
		// Getting the token from the Authorization header from format: "Bearer (token)"
		const token = authorizationHeader.split(' ')[1];
		// Identify the received token
		jwt.verify(token, process.env.TOKEN_SECRET as string);
		next();
	} catch (err) {
		res.status(401);
		res.json(`Invalid token ${err}`);
		next();
	}
};

// Make available the use of the token reader
export default tokenReader;

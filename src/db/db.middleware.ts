/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-mysql.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import { NextFunction, Request, Response, RequestHandlerParams} from 'express';

import { dbProvider } from './db.provider';
import { IDBConfig } from "./db.models";

export function withDB(config: IDBConfig): RequestHandlerParams {

	dbProvider.init(config);

	return function (req: Request, res: Response, next: NextFunction) {

		// add the connection to the request object with the property 'dbConn'
		(req as any).dbConn = dbProvider.getConnection();

		res.on('finish', () => {
			// Release the connection
			(req as any).dbConn.release();
		});

		next();
	};
}

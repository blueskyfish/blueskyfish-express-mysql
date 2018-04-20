/*
 * BlueSkyFish Express MySql - https://github.com/blueskyfish/blueskyfish-express-mysql.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import { RequestHandlerParams } from 'express-serve-static-core';
import { NextFunction, Request, Response} from 'express';

import { dbProvider } from './db.provider';
import { IDBConfig } from "./db.models";

/**
 * Creates the middleware for a express application. Every request get and has a property `dbConn` with the current
 * database connection.
 *
 * @param {IDBConfig} config the database configuration
 * @return {RequestHandlerParams} the middleware
 */
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

/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-mysql.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import { Request } from 'express';
import { DBConnection } from './db.connection';

/**
 * Returns the database connection from the express request.
 *
 * @param {e.Request} req
 * @return {DBConnection}
 */
export function getConnection(req: Request): DBConnection {
	return (req as any).dbConn;
}

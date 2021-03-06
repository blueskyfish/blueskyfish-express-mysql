/*
 * BlueSkyFish Express MySql - https://github.com/blueskyfish/blueskyfish-express-mysql.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

/**
 * The current version of the library
 */
export const version: string = '0.1.0';

export { IDBConfig} from './db/db.models';
export { DB_TAG } from './db/db.defines';
export { DBConnection } from './db/db.connection';
export { DBProvider, dbProvider } from './db/db.provider';
export { withDB } from './db/db.middleware';
export { getConnection } from './db/db.util';

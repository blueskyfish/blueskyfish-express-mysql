/*
 * BlueSkyFish Express MySql - https://github.com/blueskyfish/blueskyfish-express-mysql.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import { RequestHandlerParams } from 'express-serve-static-core';
import { Pool } from 'mysql';

declare namespace e {

	/**
	 * The database configuration
	 */
	interface IDBConfig {
		host: string;
		port: number;
		user: string;
		password: string;
		database: string;
	}

	const DB_TAG: string;
	const DB_ERR_CONNECTION:      string;
	const DB_ERR_QUERY:           string;
	const DB_ERR_QUERY_FIRST:     string;
	// Moment Date Time Pattern
	const DB_DATE_TIME_PATTERN:   string;
	const DB_DATE_PATTERN:        string;
	const DB_TIME_PATTERN:        string;

	class DBConnection {
		constructor(pool: Pool);
		query(sql: string, values: any): Promise<any>;
		queryFirst(sql: string, values: any): Promise<any>;
		release(): void;
		startTransaction(): Promise<boolean>;
		commit(): Promise<boolean>;
		rollback(): Promise<boolean>;
	}

	class DBProvider {
		init(config: IDBConfig);
		getConnection(): DBConnection;
		close(cb: Function): void;
	}

	/**
	 * Singleton of the database provider.
	 * @type {DBProvider}
	 */
	const dbProvider: DBProvider;

	function withDB(config: IDBConfig): RequestHandlerParams

	function getConnection(req: Request): DBConnection;
}

export = e;

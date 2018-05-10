/*
 * BlueSkyFish Express MySql - https://github.com/blueskyfish/blueskyfish-express-mysql.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import { RequestHandlerParams } from 'express-serve-static-core';
import { Request } from 'express';
import { Pool } from 'mysql';

declare namespace e {

	/**
	 * The current version of the library
	 */
	const version: string;

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

	class DBConnection {
		constructor(pool: Pool);

		/**
		 * Execute an sql statement and returns in the resolve callback the result of the query.
		 *
		 * @param {string} sql the sql statement
		 * @param {*} [values] the values for the sql statement.
		 * @return {Promise<*>}
		 */
		query(sql: string, values: any): Promise<any>;

		/**
		 * Returns the first element in a select query and if the query has not result an reject is called.
		 *
		 * @param {string} sql the select sql statement
		 * @param {*} [values] the values for the sql statement
		 * @return {Promise<*>}
		 */
		queryFirst(sql: string, values: any): Promise<any>;

		/**
		 * Returns the first element in a select query and if the query has no result, then it returns null.
		 *
		 * @param {string} sql the select sql statement.
		 * @param {*} [values] the values for the sql statement
		 * @return {Promise<*>} the first element or null
		 */
		querySingleton(sql: string, values: any): Promise<any>;

		/**
		 * Starts the transaction, that must be closed with `commit` or `rollback`.
		 *
		 * @return {Promise<boolean>}
		 */
		startTransaction(): Promise<boolean>;

		/**
		 * Close the transaction and commit the changing.
		 * @return {Promise<boolean>}
		 */
		commit(): Promise<boolean>;

		/**
		 * Cancel the transaction and rollback the changing.
		 * @return {Promise<boolean>}
		 */
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

	/**
	 * Creates the middleware for a express application. Every request get and has a property `dbConn` with the current
	 * database connection.
	 *
	 * @param {IDBConfig} config the database configuration
	 * @return {RequestHandlerParams} the middleware
	 */
	function withDB(config: IDBConfig): RequestHandlerParams

	/**
	 * Returns the database connection from the express request.
	 *
	 * @param {e.Request} req a express request.
	 * @return {DBConnection} the database connection
	 */
	function getConnection(req: Request): DBConnection;
}

export = e;

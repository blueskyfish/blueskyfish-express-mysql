/*
 * BlueSkyFish Express MySql - https://github.com/blueskyfish/blueskyfish-express-mysql.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import { Connection, MysqlError, Pool, PoolConnection } from 'mysql';
import { BaseError, Log } from 'blueskyfish-express-commons';
import { DB_ERR_CONNECTION, DB_ERR_QUERY, DB_ERR_QUERY_FIRST, DB_TAG } from './db.defines';

/**
 * A database connection for a mysql server
 */
export class DBConnection {

	private _connection: PoolConnection = null;

	constructor(private _pool: Pool) {}

	/**
	 * Execute an sql statement and returns in the resolve callback the result of the query.
	 *
	 * @param {string} sql the sql statement
	 * @param {*} [values] the values for the sql statement.
	 * @return {Promise<*>}
	 */
	query(sql: string, values: any = {}): Promise<any> {
		return this.openConnection()
			.then(() => {
				return new Promise(((resolve, reject) => {
					this._connection.query(sql, values, (err: MysqlError, result) => {
						if (err) {
							Log.warn(DB_TAG, 'Query Error: %s -> %s', err.errno, err.message);
							Log.warn(DB_TAG, 'Sql:\n%s', err.sql);
							Log.warn(DB_TAG, 'Stack: \n%s', err.stack);
							reject(new BaseError(DB_TAG, DB_ERR_QUERY, 'Query has an error!'));
						}
						resolve(result);
					});
				}));
			});
	}

	/**
	 * Returns the first element in a select query and if the query has not result an reject is called.
	 *
	 * @param {string} sql the select sql statement
	 * @param {*} [values] the values for the sql statement
	 * @return {Promise<*>}
	 */
	queryFirst(sql: string, values: any = {}): Promise<any> {
		return this.query(sql, values)
			.then((result: any) => {
				if (!Array.isArray(result) || result.length === 0) {
					return Promise.reject(new BaseError(DB_TAG, DB_ERR_QUERY_FIRST, 'Result is not an array'));
				}
				return result[0];
			});
	}

	/**
	 * Returns the first element in a select query and if the query has no result, then it returns null.
	 *
	 * @param {string} sql the select sql statement.
	 * @param {*} [values] the values for the sql statement
	 * @return {Promise<*>} the first element or null
	 */
	querySingleton(sql: string, values: any = {}): Promise<any> {
		return this.query(sql, values)
			.then((result: any) => {
				if (!Array.isArray(result) || result.length === 0) {
					return null;
				}
				return result[0];
			});
	}

	release(): void {
		if (this._connection) {
			this._connection.release();
			this._connection = null;
			Log.trace(DB_TAG, 'Conn close');
		}
	}

	/**
	 * Starts the transaction, that must be closed with `commit` or `rollback`.
	 *
	 * @return {Promise<boolean>}
	 */
	startTransaction(): Promise<boolean> {
		return this.openConnection()
			.then (() => {
				return new Promise<boolean>((resolve) => {
					this._connection.beginTransaction((err: MysqlError) => {
						if (err) {
							Log.warn(DB_TAG, 'Begin Transaction Error: %s -> %s', err.errno, err.message);
							return resolve(false);
						}
						resolve(true);
					})
				});
			});
	}

	/**
	 * Close the transaction and commit the changing.
	 * @return {Promise<boolean>}
	 */
	commit(): Promise<boolean> {
		return new Promise<boolean>(resolve => {
			this._connection.commit((err: MysqlError) => {
				if (err) {
					Log.warn(DB_TAG, 'Commit Error: %s -> %s', err.errno, err.message);
					return resolve(false);
				}
				resolve(true);
			});
		});
	}

	/**
	 * Cancel the transaction and rollback the changing.
	 * @return {Promise<boolean>}
	 */
	rollback(): Promise<boolean> {
		return new Promise<boolean>(resolve => {
			this._connection.rollback((err: MysqlError) => {
				if (err) {
					Log.warn(DB_TAG, 'Rollback Error: %s -> %s', err.errno, err.message);
					return resolve(false);
				}
				resolve(true);
			});
		})
	}

	private openConnection(): Promise<boolean> {
		if (this._connection) {
			return Promise.resolve(true);
		}
		return this.getConnection()
			.then((conn: PoolConnection) => {
				this._connection = conn;
				return true;
			});
	}

	private getConnection(): Promise<Connection> {
		return new Promise<Connection>(((resolve, reject) => {
			this._pool.getConnection(((err: MysqlError, connection: PoolConnection) => {
				if (err) {
					Log.warn(DB_TAG, 'Conn Error: %s -> %s', err.errno, err.message);
					reject(new BaseError(DB_TAG, DB_ERR_CONNECTION,
						err.message ? err.message : 'Could not connect to database'));
				}
				resolve(connection);
			}));
		}));
	}
}

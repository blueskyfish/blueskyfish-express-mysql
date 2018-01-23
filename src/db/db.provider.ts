/*
 * BlueSkyFish Express Commons - https://github.com/blueskyfish/blueskyfish-express-mysql.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

import { createPool, MysqlError, Pool } from 'mysql';

import { DB_TAG } from './db.defines';
import { IDBConfig } from "./db.models";
import { DBConnection } from './db.connection';
import { Log, Util } from 'blueskyfish-express-commons';

export class DBProvider {

	private _pool: Pool = null;

	init(config: IDBConfig) {
		if (!this._pool) {
			this._pool = createPool({
				host: config.host,
				port: config.port,
				user: config.user,
				password: config.password,
				database: config.database,
				connectionLimit: 10,
				queryFormat: (query, values) => {
					if (!values) {
						return query;
					}
					const sql = query.replace(/{([a-zA-Z0-9]+)?}/g, (text, key) => {
						if (values.hasOwnProperty(key)) {
							const item = values[key];
							if (Array.isArray(item)) {
								// concat the values with comma separate
								return item.map((v) => this._pool.escape(v)).join(',');
							}
							return this._pool.escape(values[key]);
						}
						return text;
					});
					Log.trace(DB_TAG, 'SQL Statement\n%s', sql);
					return sql;
				}
			});
			Log.debug(DB_TAG, 'Provider initialize\n%s', Util.toJson(config, Util.secretReplacer('password')));
		}
	}

	getConnection(): DBConnection {
		return new DBConnection(this._pool);
	}

	close(cb: Function): void {
		if (typeof cb !== 'function') {
			cb = function (err) {
				if (err) throw err;
			}
		}
		if (this._pool) {
			this._pool.end((err: MysqlError) => {
				if (err) {
					Log.warn(DB_TAG, 'Query Error: %s -> %s', err.errno, err.message);
					Log.warn(DB_TAG, 'Stack: \n%s', err.stack);
					return;
				}
				cb(err);
			});
		}
	}
}

/**
 * Singleton of the database provider.
 * @type {DBProvider}
 */
export const dbProvider: DBProvider = new DBProvider();

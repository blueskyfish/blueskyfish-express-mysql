/*
 * BlueSkyFish Express MySql - https://github.com/blueskyfish/blueskyfish-express-mysql.git
 *
 * The MIT License (MIT)
 * Copyright 2018 BlueSkyFish
 */

/**
 * The database configuration
 */
export interface IDBConfig {
	host: string;
	port: number;
	user: string;
	password: string;
	database: string;
}

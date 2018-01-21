
![BlueSkyFish Express MySql](logo.png)

# BlueSkyFish Express MySql

> A database connector to mysql server for micro services

A middleware for the express microservices

**Example**

```js
import * as express from 'express';
import { Http, Env } from 'bluesykfish-express-commons';

const app = express();

const dbConfig = {
    host: Env.fromEnv('DB_HOST') || 'localhost',
    port: Env.fromEnvNumber('DB_PORT', 3306),
    user: Env.fromEnv('DB_USER') || 'root',
    database: Env.fromEnv('DB_DATABASE'),
    password: Env.fromEnv('DB_PASSWORD')
};

app.use(withDB(dbConfig));

app.get('/users', async (req, res) => {
    const db = req.dbConn;
    const users = await db.query('SELECT * FROM users WHERE status = {status}', { status: 'ok'});
    Http.sendData(res, users);
});
```

## Requirements

* [NodeJS][nodejs] Version 8.x or higher.
* [Typescript][typescript] Version 2.6.2 or higher.
* [Express][express] Version 4.16 or higher
* [Node MySQL][node-mysql] Version 2.15.0 or higher.
* [BlueSkyFish Express Commons][bsf-ec] Version 0.0.1 or higher.

Global installed typescript. `npm install --global typescript`.

The library is written in [Typescript][typescript]. During the installation of the library it will be compiled into Javascript **ES2015** modules.


## Installation

```bash
$ npm install -S blueskyfish-express-mysql
```


## History

| Version    | Date       | Description
|------------|:----------:|--------------------------------------------
| `0.0.1`    | 2018-01-21 | Initial the library. It is extract from my other internal projects.


## License

```text
The MIT License
Copyright 2018 BlueSkyFish
```


[nodejs]: https://nodejs.org/en/
[typescript]: https://www.typescriptlang.org/
[express]: https://expressjs.com/
[node-mysql]: https://github.com/mysqljs/mysql
[bsf-ec]: https://github.com/blueskyfish/blueskyfish-express-commons


![BlueSkyFish Express MySql](logo.png)

# BlueSkyFish Express MySql

> A database connector and middleware to mysql server for micro services

A middleware for the express microservices

**Breaking Change** switch to [yarn][yarn].

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
* [Yarn][yarn]
* [Typescript][typescript] Version 2.6.2 or higher.
* [Express][express] Version 4.16 or higher
* [Node MySQL][node-mysql] Version 2.15.0 or higher.
* [BlueSkyFish Express Commons][bsf-ec] Version 0.0.11 or higher.

Global installed typescript. `npm install --global typescript`.

The library is written in [Typescript][typescript]. During the installation of the library it will be compiled into Javascript **ES2015** modules.


## Installation

```bash
$ npm install -S blueskyfish-express-mysql
```


## Dependencies

All libraries from **blueskyfish-express-*** and depended applications should use the same version of the dependencies node modules.

| name                    | Version
|-------------------------|-------------
| `express`               | `4.16.3`
| `lodash`                | `4.17.5`
| `moment`                | `2.22.0`
| `mysql`                 | `2.15.0`
|-------------------------|-------------
| `mocha`                 | `5.1.0`
| `ts-node`               | `5.0.1`
| `typescript`            | `2.6.2`


## History

| Version    | Date       | Description
|------------|:----------:|--------------------------------------------
| `0.3.2`    | 2018-05-10 | improve db error message. clean unused constants
| `0.3.1`    | 2018-05.02 | adjust tsc options
| `0.2.1`    | 2018-05-01 | switch to yarn
| `0.1.0`    | 2018-04-20 | add querySingleton method. improve the js documentation
| `0.0.13`   | 2018-04-13 | adjust the version of the depended node modules.
| `0.0.11`   | 2018-03-20 | NULL is a sql NULL
| `0.0.10`   | 2018-02-22 | adjust the version of the depended node modules.
| `0.0.9`    | 2018-02-18 | adjust the version of blueskyfish-express-commons
| `0.0.8`    | 2018-01-13 | log db configuration only in Trace log level
| `0.0.4`    | 2018-01-24 | get database connection from express request.
| `0.0.2`    | 2018-01-24 | fixed the typescript error for express type.
| `0.0.1`    | 2018-01-21 | Initial the library. It is extract from my other internal projects.


## License

```text
The MIT License

Copyright 2018 BlueSkyFish

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```


[nodejs]: https://nodejs.org/en/
[typescript]: https://www.typescriptlang.org/
[express]: https://expressjs.com/
[node-mysql]: https://github.com/mysqljs/mysql
[bsf-ec]: https://github.com/blueskyfish/blueskyfish-express-commons
[yarn]: https://yarnpkg.com/

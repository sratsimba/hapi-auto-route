# hapi-auto-route

![npm](https://img.shields.io/npm/v/hapi-auto-route)
[![Dependency Status](https://david-dm.org/sitrakary/hapi-auto-route.svg)](https://david-dm.org/sitrakary/hapi-auto-route)
[![devDependency Status](https://david-dm.org/sitrakay/hapi-auto-route/dev-status.svg)](https://david-dm.org/sitrakay/hapi-auto-route#info=devDependencies)

[![NPM](https://nodei.co/npm/hapi-auto-route.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/hapi-auto-route/)

hapi-auto-route is a hapi plugin that lets you load route objects automatically from a directory. And allow routes path to be prefixed.

Maintainer: [Sitraka Ratsimba](https://github.com/hsitraka)

## Installation

For Hapi `>= v17`:

```bash
npm i -S hapi-auto-route
```

For Hapi `v16.x.x`:

```bash
npm i -S hapi-auto-route@1.1.0
```


## Code Example

Suppose your directory looks like this:

```
node_modules/
routes/
  home.js
server.js
package.json
```

```javascript
// routes/home.js
'use strict';

module.exports = {
    method: 'GET',
    path: '/',
    handler: (request, h) => 'Hello';
}
```

```javascript
// server.js
'use strict';

const Hapi = require('hapi');

const server = Hapi.Server({
  port: 3000,
  host: 'localhost'
});

const init = async () => {
    await server.register(require('hapi-auto-route'));
    await server.start();
    console.log(`Server is running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (error) => {
  console.log(error);
  process.exit();
});

init();
```

Now, you can start the server and see `Hello` at `http://localhost:3000`.


## API

- `routes_dir`: directory where routes are located. `routes_dir` must be relatives from `process.cwd()`. Defaults to `'routes'`.
- `pattern`: glob pattern used to find route files. Defaults to `**/!(_)*.js`.
- `use_prefix`: Use directory tree as prefix. Defaults to `false`.

## Contributing

If you find a bug in the source code or a mistake in the documentation, you can help us by [submitting an issue](https://github.com/sitrakay/hapi-auto-route/issues) or a [pull request](https://github.com/sitrakay/hapi-auto-route/pulls) with a fix.

## Licence

This project is licensed under the MIT License - see the [LICENSE](https://github.com/sitrakay/hapi-auto-route/blob/master/LICENSE) file for details.

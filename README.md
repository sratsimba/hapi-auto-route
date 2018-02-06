# hapi-auto-route

[![Semver](http://img.shields.io/SemVer/2.0.0.png)](http://semver.org/spec/v2.0.0.html)
[![Dependency Status](https://david-dm.org/sitrakary/hapi-auto-route.svg)](https://david-dm.org/sitrakary/hapi-auto-route)
[![devDependency Status](https://david-dm.org/sitrakay/hapi-auto-route/dev-status.svg)](https://david-dm.org/sitrakay/hapi-auto-route#info=devDependencies)

Autoloads hapi routes.

## Installation

Just type `yarn add hapi-auto-route` or `npm i -S hapi-auto-route`.

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
module.exports = {
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply('Hello');
}
```

```javascript
// server.js
'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: 3000, labels: ['web'] });
server.register(require('hapi-auto-route'), (error) => {

    if(error) throw error;
    server.start();
});
```

Now, you can start the server and see `Hello` at `http://localhost:3000`.


## API

- `dir`: the absolute path to the route directories. Defaults to `process.cwd() + '/routes'`.
- `pattern`: glob pattern used to find route files. Defaults to `/**/!(_)*.js`.
- `prefix`: Use directory tree as prefix. Defaults to `true`.

## Contributing

If you find a bug in the source code or a mistake in the documentation, you can help us by [submitting an issue](https://github.com/sitrakay/hapi-auto-route/issues) or a [pull request](https://github.com/sitrakay/hapi-auto-route/pulls) with a fix.

## Licence

This project is licensed under the MIT License - see the [LICENSE.txt](https://github.com/sitrakay/hapi-auto-route/blob/master/LICENCE.txt) file for details.
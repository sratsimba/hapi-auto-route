# hapi-auto-route

Autoloads hapi routes.

# Options

- `dir`: the absolute path to the route directories. This option is required.
- `pattern`: glob pattern used to find route files. Defaults to `/**/!(_)*.js`.
- `prefix`: Use directory tree as prefix. Defaults to `true`.

## Basic usage

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
const AutoRoute = require('hapi-auto-route');

const server = new Hapi.Server();

server.connection({port: 3000, labels: ['web']});

server.register({
    register: AutoRoute,
    options: { dir: __dirname + '/routes' }
}, (error) => {

    if(error) throw error;
    server.start();
});
```

Now, you can start the server and see `Hello` at `http://localhost:3000`.

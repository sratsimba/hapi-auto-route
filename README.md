# hapi-auto-route

Autoloads hapi routes.

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
const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({
    port: 3000,
    labels: ['app']
});

server.register([
    {
        register: require('hapi-auto-route'),
        options: { dir: __dirname + '/routes' },
    }
], (error) => {
    if (error) throw error;
    server.start();
})
```
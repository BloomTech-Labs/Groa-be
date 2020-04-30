const server = require('./api/server.js');
const oidc = require('./config/oidcMiddleware');

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`\n *** Server listening on port ${PORT} *** \n`);
})

// oidc.on('ready', () => {
//     server.listen(PORT, () => console.log(`app started ${PORT}`));
// });

// oidc.on('error', err => {
//     // An error occurred with OIDC
//     // eslint-disable-next-line no-console
//     console.error('OIDC ERROR: ', err);
//     // Throwing an error will terminate the server process
//     // throw err;
// });

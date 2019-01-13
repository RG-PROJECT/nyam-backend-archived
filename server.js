const http = require('http');
const https = require('https');
const fs = require('fs');
const app = require('./app');

const PORT = process.env.PORT || 2083;
const CREDENTIAL_CERT_PATH = './cert/nyam.deerwhite.net.pem';
const CREDENTIAL_KEY_PATH = './cert/nyam.deerwhite.net.key';

const credentials = {
	cert: fs.readFileSync(CREDENTIAL_CERT_PATH, 'utf8'),
	key: fs.readFileSync(CREDENTIAL_KEY_PATH, 'utf8')
};

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`Server start listening on port ${PORT}`);

const server = (process.env.NODE_ENV === 'development')? http.createServer(app) : https.createServer(credentials, app);

server.listen(PORT);

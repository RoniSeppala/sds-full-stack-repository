import http from 'http';
import dotenv from 'dotenv';
import { EventEmitter } from 'events';
import { now } from './utilities/timestamp.js';
import fs from 'fs';

dotenv.config();
const port = process.env.PORT || 3000;

// Create an event emitter instance
const eventEmitter = new EventEmitter();
eventEmitter.on('log', (message) => {
    console.log(`[${now()}] ${message}`);
});

const serveStatic = async(res, fileName) => {
    const filePath = `./public/${fileName}`;
    eventEmitter.emit('log', `Serving static file: ${filePath}`);
    const data = await fs.promises.readFile(filePath, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
}

const server = http.createServer(async (req, res) => {
    eventEmitter.emit('log', `Received ${req.method} request for ${req.url}`);

    try {
        if (req.method === 'GET' && req.url === '/') {
            await serveStatic(res, 'index.html');
        }
        else if (req.method === 'GET' && req.url === '/about') {
            await serveStatic(res, 'about.html');
        }
        else {
            res.statusCode = 404;
            res.end('Not Found');
        }
    }
    catch (err) {
        res.statusCode = 500;
        res.end('Server Error');
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 8787);

const TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml; charset=utf-8'
};

function send(res, status, body, type = 'text/plain; charset=utf-8') {
    res.writeHead(status, {
        'content-type': type,
        'cache-control': 'no-store'
    });
    res.end(body);
}

function resolveRequest(url) {
    const pathname = decodeURIComponent(new URL(url, `http://${HOST}:${PORT}`).pathname);
    const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const full = path.resolve(ROOT, relative);
    if (!full.startsWith(ROOT)) return null;
    return full;
}

const server = http.createServer((req, res) => {
    const file = resolveRequest(req.url || '/');
    if (!file) {
        send(res, 403, 'Forbidden');
        return;
    }
    fs.stat(file, (statErr, stat) => {
        if (statErr || !stat.isFile()) {
            send(res, 404, 'Not Found');
            return;
        }
        const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
        res.writeHead(200, { 'content-type': type, 'cache-control': 'no-store' });
        fs.createReadStream(file).pipe(res);
    });
});

server.listen(PORT, HOST, () => {
    console.log(`ram-blog running at http://${HOST}:${PORT}`);
});

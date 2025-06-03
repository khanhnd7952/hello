const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!\n');
});

const PORT = 3000;
const HOST = '0.0.0.0';  // Lắng nghe trên tất cả các interface

server.listen(PORT, HOST, () => {
    console.log(`Server đang chạy tại http://${HOST}:${PORT}/`);
}); 
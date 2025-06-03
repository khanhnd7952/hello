const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    if (parsedUrl.pathname === '/calculator') {
        const { num1, num2, operation } = parsedUrl.query;
        
        if (!num1 || !num2 || !operation) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Vui lòng cung cấp đầy đủ num1, num2 và operation');
            return;
        }

        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);
        let result;

        switch(operation) {
            case 'add':
                result = n1 + n2;
                break;
            case 'subtract':
                result = n1 - n2;
                break;
            case 'multiply':
                result = n1 * n2;
                break;
            case 'divide':
                if (n2 === 0) {
                    res.writeHead(400, {'Content-Type': 'text/plain'});
                    res.end('Không thể chia cho 0');
                    return;
                }
                result = n1 / n2;
                break;
            default:
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end('Phép tính không hợp lệ. Sử dụng: add, subtract, multiply, divide');
                return;
        }

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Kết quả: ${result}`);
    } else if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/index.html') {
        // Phục vụ file HTML
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Lỗi server');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        });
    } else {
        res.writeHead(404);
        res.end('Không tìm thấy trang');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}/`);
}); 
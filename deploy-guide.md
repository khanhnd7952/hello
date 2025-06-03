# Hướng dẫn Deploy lên VPS

## 1. Cài đặt Node.js trên VPS

```bash
# Cập nhật hệ thống
sudo apt update
sudo apt upgrade

# Cài đặt Node.js và npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Kiểm tra cài đặt
node --version
npm --version
```

## 2. Cài đặt PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

## 3. Clone và cài đặt ứng dụng
```bash
# Tạo thư mục cho ứng dụng
mkdir /var/www/hello-world
cd /var/www/hello-world

# Clone repository (thay YOUR_REPOSITORY_URL bằng URL của repository của bạn)
git clone YOUR_REPOSITORY_URL .

# Cài đặt dependencies
npm install
```

## 4. Cấu hình PM2
```bash
# Khởi động ứng dụng với PM2
pm2 start app.js --name "hello-world"

# Cấu hình PM2 khởi động cùng hệ thống
pm2 startup
pm2 save
```

## 5. Cấu hình Nginx (Reverse Proxy)
```bash
# Cài đặt Nginx
sudo apt install nginx

# Tạo file cấu hình
sudo nano /etc/nginx/sites-available/hello-world
```

Thêm nội dung sau vào file cấu hình:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Thay bằng domain của bạn

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Tạo symbolic link
sudo ln -s /etc/nginx/sites-available/hello-world /etc/nginx/sites-enabled/

# Kiểm tra cấu hình Nginx
sudo nginx -t

# Khởi động lại Nginx
sudo systemctl restart nginx
```

## 6. Cấu hình Firewall
```bash
# Mở port 80 và 443
sudo ufw allow 80
sudo ufw allow 443
```

## 7. Cấu hình SSL với Let's Encrypt (Tùy chọn)
```bash
# Cài đặt Certbot
sudo apt install certbot python3-certbot-nginx

# Cấu hình SSL
sudo certbot --nginx -d your-domain.com
```

## Các lệnh hữu ích
```bash
# Xem logs của ứng dụng
pm2 logs hello-world

# Khởi động lại ứng dụng
pm2 restart hello-world

# Xem trạng thái ứng dụng
pm2 status

# Xem logs của Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
``` 
# Bulut Tabanlı E-Ticaret Uygulaması

# Proje Hakkında

Bu proje, bulut bilişim teknolojileri kullanılarak geliştirilen basit bir e-ticaret uygulamasıdır. 
Uygulama sayesinde kullanıcılar ürün ekleyebilmekte, ürünleri listeleyebilmekte ve sipariş oluşturabilmektedir.

Proje kapsamında istemci-sunucu mimarisi kullanılmıştır. Backend tarafında Node.js ve Express.js frameworkü tercih edilmiş, veriler SQLite veritabanında saklanmıştır. Frontend kısmı ise HTML, CSS ve JavaScript kullanılarak geliştirilmiştir.

Sistem AWS EC2 servisi üzerinde çalıştırılarak bulut ortamına taşınmıştır.

---

# Kullanılan Teknolojiler

# Backend
- Node.js
- Express.js
- REST API

# Frontend
- HTML
- CSS
- JavaScript

# Veritabanı
- SQLite

# Bulut Teknolojileri
- AWS EC2
- AWS Security Groups
- GitHub

# Proje Özellikleri

- Ürün ekleme
- Ürün listeleme
- Ürün silme
- Sipariş oluşturma
- Stok kontrolü
- Sipariş listeleme
- REST API desteği
- AWS EC2 üzerinde yayınlama

# Sistem Mimarisi

Kullanıcı → Frontend → REST API → SQLite Veritabanı
                           ↓
                        AWS EC2 

## API Endpointleri
# Ürün İşlemleri
Tüm ürünleri listeleme:
GET /products

Yeni ürün ekleme:
POST /products

Örnek JSON:

{
  "name": "Laptop",
  "price": 25000,
  "stock": 10
}

Ürün silme:
DELETE /products/:id

# Sipariş İşlemleri
Sipariş oluşturma:
POST /orders

Örnek JSON:

{
  "customer_name": "Gözde",
  "product_id": 1,
  "quantity": 2
}

Sipariş listeleme:
GET /orders

# Kurulum Adımları

Projeyi klonlama:
git clone https://github.com/gozdesari/eticaret-cloud-project.git

Backend kurulumu:
cd eticaret-cloud-project/backend
npm install
node server.js

Frontend çalıştırma:

Frontend klasörü içerisindeki index.html dosyası tarayıcı üzerinden açılır.

# AWS Deployment

Proje AWS EC2 servisi üzerinde çalıştırılmıştır.
EC2 üzerinde Node.js kurulmuş, proje GitHub üzerinden sunucuya çekilmiş ve backend servisi çalıştırılmıştır.

Security Group ayarlarında 3000 portu dış erişime açılmıştır.

# Ölçeklendirme Yaklaşımı

Sistemin yüksek kullanıcı trafiğinde daha verimli çalışabilmesi amacıyla Auto Scaling ve Load Balancer mimarisi düşünülmüştür.

 Load Balancer gelen istekleri sunucular arasında dağıtır.
 Auto Scaling yoğunluk durumuna göre yeni sunucu oluşturabilir.
 Böylece sistem kesintisiz hizmet verebilir.
const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "E-Ticaret Backend API çalışıyor" });
});

// Ürünleri listele
app.get("/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Ürün ekle
app.post("/products", (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || price == null || stock == null) {
    return res.status(400).json({ error: "Ürün adı, fiyat ve stok zorunludur." });
  }

  db.run(
    "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
    [name, price, stock],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        id: this.lastID,
        name,
        price,
        stock,
      });
    }
  );
});

// Ürün sil
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Ürün silindi." });
  });
});

// Sipariş oluştur
app.post("/orders", (req, res) => {
  const { customer_name, product_id, quantity } = req.body;

  if (!customer_name || !product_id || !quantity) {
    return res.status(400).json({ error: "Müşteri adı, ürün ve adet zorunludur." });
  }

  db.get("SELECT * FROM products WHERE id = ?", [product_id], (err, product) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!product) {
      return res.status(404).json({ error: "Ürün bulunamadı." });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: "Yetersiz stok." });
    }

    const total_price = product.price * quantity;
    const newStock = product.stock - quantity;

    db.run("UPDATE products SET stock = ? WHERE id = ?", [newStock, product_id]);

    db.run(
      "INSERT INTO orders (customer_name, product_id, quantity, total_price) VALUES (?, ?, ?, ?)",
      [customer_name, product_id, quantity, total_price],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
          id: this.lastID,
          customer_name,
          product_id,
          quantity,
          total_price,
        });
      }
    );
  });
});

// Siparişleri listele
app.get("/orders", (req, res) => {
  db.all(
    `
    SELECT 
      orders.id,
      orders.customer_name,
      products.name AS product_name,
      orders.quantity,
      orders.total_price,
      orders.created_at
    FROM orders
    JOIN products ON orders.product_id = products.id
    ORDER BY orders.id DESC
    `,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json(rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Backend sunucusu http://localhost:${PORT} üzerinde çalışıyor`);
});
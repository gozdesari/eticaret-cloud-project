const API_URL = "http://localhost:3000";

const productForm = document.getElementById("productForm");
const orderForm = document.getElementById("orderForm");
const productsDiv = document.getElementById("products");
const ordersDiv = document.getElementById("orders");

async function getProducts() {
  const response = await fetch(`${API_URL}/products`);
  const products = await response.json();

  productsDiv.innerHTML = "";

  if (products.length === 0) {
    productsDiv.innerHTML = "<p>Henüz ürün eklenmedi.</p>";
    return;
  }

  products.forEach((product) => {
    productsDiv.innerHTML += `
      <div class="product">
        <strong>ID:</strong> ${product.id}<br>
        <strong>Ürün:</strong> ${product.name}<br>
        <strong>Fiyat:</strong> ${product.price} TL<br>
        <strong>Stok:</strong> ${product.stock}<br>
        <button class="delete-btn" onclick="deleteProduct(${product.id})">Sil</button>
      </div>
    `;
  });
}

async function addProduct(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const price = Number(document.getElementById("price").value);
  const stock = Number(document.getElementById("stock").value);

  await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price, stock }),
  });

  productForm.reset();
  getProducts();
}

async function deleteProduct(id) {
  await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  getProducts();
}

async function getOrders() {
  const response = await fetch(`${API_URL}/orders`);
  const orders = await response.json();

  ordersDiv.innerHTML = "";

  if (orders.length === 0) {
    ordersDiv.innerHTML = "<p>Henüz sipariş oluşturulmadı.</p>";
    return;
  }

  orders.forEach((order) => {
    ordersDiv.innerHTML += `
      <div class="order">
        <strong>Sipariş ID:</strong> ${order.id}<br>
        <strong>Müşteri:</strong> ${order.customer_name}<br>
        <strong>Ürün:</strong> ${order.product_name}<br>
        <strong>Adet:</strong> ${order.quantity}<br>
        <strong>Toplam:</strong> ${order.total_price} TL<br>
        <strong>Tarih:</strong> ${order.created_at}
      </div>
    `;
  });
}

async function addOrder(event) {
  event.preventDefault();

  const customer_name = document.getElementById("customerName").value;
  const product_id = Number(document.getElementById("productId").value);
  const quantity = Number(document.getElementById("quantity").value);

  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ customer_name, product_id, quantity }),
  });

  const result = await response.json();

  if (!response.ok) {
    alert(result.error);
    return;
  }

  orderForm.reset();
  getProducts();
  getOrders();
}

productForm.addEventListener("submit", addProduct);
orderForm.addEventListener("submit", addOrder);

getProducts();
getOrders();
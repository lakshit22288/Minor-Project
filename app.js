let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];

document.getElementById("totalProducts").innerText = products.length;

let totalStock = products.reduce((s, p) => s + Number(p.stock), 0);
document.getElementById("totalStock").innerText = totalStock;

let today = new Date().toLocaleDateString();
let todayAmount = sales
    .filter(s => s.date === today)
    .reduce((sum, s) => sum + s.total, 0);

document.getElementById("todaySales").innerText = "₹" + todayAmount;

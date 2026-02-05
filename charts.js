Chart.defaults.color = "#ffffff";
Chart.defaults.borderColor = "rgba(255,255,255,0.3)";

let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];

/* ------------------------------
   STOCK CHART
------------------------------- */
new Chart(stockChart, {
    type: "bar",
    data: {
        labels: products.map(p => p.name),
        datasets: [{
            label: "Stock",
            data: products.map(p => p.stock),
            backgroundColor: "#3b82f6"
        }]
    }
});

/* ------------------------------
   SALES CHART
------------------------------- */
new Chart(salesChart, {
    type: "line",
    data: {
        labels: sales.map(s => s.name),
        datasets: [{
            label: "Sales (₹)",
            data: sales.map(s => s.total),
            borderWidth: 3,
            borderColor: "#10b981"
        }]
    }
});

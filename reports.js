let stock = JSON.parse(localStorage.getItem("stock")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];

/* -------- STOCK CHART -------- */
let stockNames = stock.map(s => s.name);
let stockQty = stock.map(s => s.qty);

new Chart(document.getElementById("stockChart"), {
    type: "bar",
    data: {
        labels: stockNames,
        datasets: [{
            label: "Stock",
            data: stockQty
        }]
    }
});

/* -------- SALES CHART -------- */
let saleNames = sales.map(s => s.name);
let saleTotals = sales.map(s => s.total);

new Chart(document.getElementById("salesChart"), {
    type: "line",
    data: {
        labels: saleNames,
        datasets: [{
            label: "Sales (₹)",
            data: saleTotals
        }]
    }
});

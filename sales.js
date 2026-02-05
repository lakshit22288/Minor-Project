let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];

/* ------------------------------
   LOAD PRODUCT DROPDOWN
------------------------------- */
function loadDropdown() {
    saleProduct.innerHTML = "";
    products.forEach((p, i) => {
        saleProduct.innerHTML += `<option value="${i}">${p.name}</option>`;
    });
}

/* ------------------------------
   ADD SALE
------------------------------- */
function addSale() {
    let index = saleProduct.value;
    let qty = Number(saleQty.value);

    if (qty <= 0) {
        showToast("Invalid quantity");
        return;
    }

    if (products[index].stock < qty) {
        showToast("Not enough stock!");
        return;
    }

    products[index].stock -= qty;

    let total = qty * products[index].price;

    let invoiceId = "INV-" + Date.now();

    sales.push({
        name: products[index].name,
        qty,
        total,
        invoiceId,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("sales", JSON.stringify(sales));

    saleQty.value = "";
    loadSales();
    loadDropdown();

    if (products[index].stock < 10) showToast(`Low stock: ${products[index].name}`);

    showToast("Sale added!");
}

/* ------------------------------
   CLEAR SALES
------------------------------- */
function clearSales() {
    sales = [];
    localStorage.setItem("sales", JSON.stringify(sales));
    loadSales();
    showToast("Sales history cleared");
}

/* ------------------------------
   DOWNLOAD PDF
------------------------------- */
function downloadInvoice(i) {
    generatePDF(sales[i]);
}

/* ------------------------------
   LOAD SALES TABLE
------------------------------- */
function loadSales() {
    saleTable.innerHTML = "";

    sales.forEach((s, i) => {
        saleTable.innerHTML += `
        <tr>
            <td>${s.name}</td>
            <td>${s.qty}</td>
            <td>₹${s.total}</td>
            <td>
                <button class="pdf-btn" onclick="downloadInvoice(${i})">
                    PDF
                </button>
            </td>
        </tr>`;
    });
}

loadDropdown();
loadSales();

/* ------------------------------
   SEARCH
------------------------------- */
document.getElementById("searchSales").onkeyup = () =>
    searchTable("searchSales", "saleTable");

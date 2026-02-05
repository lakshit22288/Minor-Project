let products = JSON.parse(localStorage.getItem("products")) || [];

/* ------------------------------
   DELETE STOCK ITEM
------------------------------- */
function deleteStock(i) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadStock();
    showToast("Product removed from stock");
}

/* ------------------------------
   LOAD STOCK TABLE
------------------------------- */
function loadStock() {
    stockTable.innerHTML = "";

    products.forEach((p, i) => {
        let alertColor = p.stock < 10 ? "style='color:#ff6b6b;font-weight:700;'" : "";

        if (p.stock < 10) showToast(`Low stock: ${p.name}`);

        stockTable.innerHTML += `
        <tr>
            <td>${p.name}</td>
            <td ${alertColor}>${p.stock}</td>
            <td><button class="delete-btn" onclick="deleteStock(${i})">Delete</button></td>
        </tr>`;
    });
}

loadStock();

/* ------------------------------
   SEARCH
------------------------------- */
document.getElementById("searchStock").onkeyup = () =>
    searchTable("searchStock", "stockTable");

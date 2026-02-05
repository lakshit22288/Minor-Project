let products = JSON.parse(localStorage.getItem("products")) || [];

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

/* ------------------------------
   ADD PRODUCT
------------------------------- */
function addProduct() {
    let name = pname.value.trim();
    let cat = pcat.value.trim();
    let price = Number(pprice.value.trim());
    let stock = Number(pstock.value.trim());

    if (!name || !cat || !price || !stock) {
        showToast("Please fill all fields");
        return;
    }

    products.push({ name, cat, price, stock });
    saveProducts();

    loadProducts();
    loadUpdateDropdown();

    pname.value = "";
    pcat.value = "";
    pprice.value = "";
    pstock.value = "";

    showToast("Product added!");
}

/* ------------------------------
   UPDATE STOCK
------------------------------- */
function loadUpdateDropdown() {
    updateProduct.innerHTML = "";
    products.forEach((p, i) => {
        updateProduct.innerHTML += `<option value="${i}">${p.name}</option>`;
    });
}

function updateStock() {
    let index = updateProduct.value;
    let qty = Number(updateQty.value);

    if (qty <= 0) {
        showToast("Invalid quantity");
        return;
    }

    products[index].stock += qty;
    saveProducts();

    loadProducts();
    loadUpdateDropdown();
    updateQty.value = "";

    showToast("Stock updated!");
}

/* ------------------------------
   DELETE PRODUCT
------------------------------- */
function deleteProduct(i) {
    products.splice(i, 1);
    saveProducts();
    loadProducts();
    loadUpdateDropdown();
    showToast("Product deleted");
}

/* ------------------------------
   LOAD TABLE
------------------------------- */
function loadProducts() {
    productTable.innerHTML = "";

    products.forEach((p, i) => {
        productTable.innerHTML += `
        <tr>
            <td>${p.name}</td>
            <td>${p.cat}</td>
            <td>₹${p.price}</td>
            <td>${p.stock}</td>
            <td>
                <button class="delete-btn" onclick="deleteProduct(${i})">Delete</button>
            </td>
        </tr>`;
    });
}

loadProducts();
loadUpdateDropdown();

/* ------------------------------
   SEARCH + SORT
------------------------------- */
document.getElementById("searchProducts").onkeyup = () =>
    searchTable("searchProducts", "productTable");

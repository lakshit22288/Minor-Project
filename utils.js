/* ------------------------------
   TOAST POPUP ALERT
------------------------------- */
function showToast(msg) {
    let toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = msg;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3500);
}

/* ------------------------------
   AUTO RESET AT MIDNIGHT
------------------------------- */
function checkMidnightReset() {
    let lastReset = localStorage.getItem("lastReset");
    let today = new Date().toDateString();

    if (lastReset !== today) {
        localStorage.setItem("todaySalesTotal", "0");
        localStorage.setItem("lastReset", today);
    }
}
checkMidnightReset();

/* ------------------------------
   GENERIC SEARCH FILTER
------------------------------- */
function searchTable(inputId, tableId) {
    let value = document.getElementById(inputId).value.toLowerCase();
    let rows = document.getElementById(tableId).getElementsByTagName("tr");

    for (let r of rows) {
        let text = r.innerText.toLowerCase();
        r.style.display = text.includes(value) ? "" : "none";
    }
}

/* ------------------------------
   SORT ANY TABLE
------------------------------- */
function sortTable(tableId, colIndex, asc = true) {
    let table = document.getElementById(tableId);
    let rows = Array.from(table.rows);

    rows.sort((a, b) => {
        let x = a.cells[colIndex].innerText.toLowerCase();
        let y = b.cells[colIndex].innerText.toLowerCase();

        return asc ? x.localeCompare(y) : y.localeCompare(x);
    });

    table.innerHTML = "";
    rows.forEach(row => table.appendChild(row));
}

const API = "http://localhost:3000";

async function loadItems() {
  const res = await fetch(`${API}/items`);
  const items = await res.json();
  const list = document.getElementById("itemsList");
  list.innerHTML = "";
  items.forEach(i => {
    const li = document.createElement("li");
    li.textContent = `${i.id}. ${i.name}`;
    list.appendChild(li);
  });
}

document.getElementById("itemForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("itemName").value;
  await fetch(`${API}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  document.getElementById("itemName").value = "";
  await loadItems();
});

window.addEventListener("load", loadItems);

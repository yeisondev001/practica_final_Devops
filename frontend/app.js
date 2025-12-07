const API = "http://localhost:3000";

const form = document.getElementById("itemForm");
const itemName = document.getElementById("itemName");
const list = document.getElementById("itemsList");

window.onload = loadItems;

async function loadItems() {
  const res = await fetch(`${API}/items`);
  const items = await res.json();

  list.innerHTML = "";
  items.forEach(i => {
    const li = document.createElement("li");
    li.textContent = `${i.id}. ${i.name}`;
    list.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = itemName.value;

  await fetch(`${API}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });

  itemName.value = "";
  loadItems();
});

let bikes = JSON.parse(localStorage.getItem("bikes")) || [];
let selectedId = bikes.length ? bikes[0].id : null;

const form = document.getElementById("bikeForm");
const list = document.getElementById("bikeList");

function save() {
  localStorage.setItem("bikes", JSON.stringify(bikes));
}

function getSelectedBike() {
  return bikes.find((b) => b.id === selectedId);
}

function makeButton(label, onClick) {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.onclick = onClick;
  return btn;
}

// CREATE
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const bike = {
    id: Date.now(),
    name: document.getElementById("bikeName").value.trim(),
    color: document.getElementById("bikeColor").value,
    speed: Number(document.getElementById("bikeSpeed").value),
  };
  bikes.push(bike);
  if (selectedId === null) selectedId = bike.id;
  form.reset();
  save();
  renderGarage();
});

// READ
function renderGarage() {
  list.innerHTML = "";
  for (const bike of bikes) {
    const li = document.createElement("li");
    if (bike.id === selectedId) li.style.outline = "2px solid #ffd23f";

    const swatch = document.createElement("span");
    swatch.style.cssText = `display:inline-block;width:14px;height:14px;background:${bike.color}`;

    const info = document.createElement("span");
    info.textContent = ` ${bike.name} (speed ${bike.speed}) `;

    // SELECT
    const selectBtn = makeButton("Select", () => {
      selectedId = bike.id;
      renderGarage();
    });

    // UPDATE
    const upgradeBtn = makeButton("Upgrade", () => {
      bike.speed = Math.min(10, bike.speed + 1);
      save();
      renderGarage();
    });

    // DELETE
    const sellBtn = makeButton("Sell", () => {
      bikes = bikes.filter((b) => b.id !== bike.id);
      if (selectedId === bike.id) selectedId = bikes.length ? bikes[0].id : null;
      save();
      renderGarage();
    });

    li.append(swatch, info, selectBtn, upgradeBtn, sellBtn);
    list.appendChild(li);
  }
}

renderGarage();
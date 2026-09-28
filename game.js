const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const LANES = 4;
const laneWidth = canvas.width / LANES;

const player = { lane: 1, y: 500, w: 30, h: 50 };
let cars = [];
let roadOffset = 0;

// ---------- input ----------
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") player.lane = Math.max(0, player.lane - 1);
  if (e.key === "ArrowRight") player.lane = Math.min(LANES - 1, player.lane + 1);
});

// ---------- traffic ----------
function spawnCar() {
  if (!getSelectedBike()) return; // no bike, no traffic
  cars.push({ lane: Math.floor(Math.random() * LANES), y: -60, w: 30, h: 50 });
}
setInterval(spawnCar, 900);

function updateCars(bike) {
  for (const car of cars) car.y += bike.speed;
  cars = cars.filter((car) => car.y < canvas.height);
}

// ---------- drawing ----------
function drawRoad() {
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 3;
  ctx.setLineDash([20, 20]);
  ctx.lineDashOffset = -roadOffset;
  for (let i = 1; i < LANES; i++) {
    ctx.beginPath();
    ctx.moveTo(i * laneWidth, 0);
    ctx.lineTo(i * laneWidth, canvas.height);
    ctx.stroke();
  }
  ctx.setLineDash([]);
}

function drawCars() {
  ctx.fillStyle = "#e5484d";
  for (const car of cars) {
    const x = car.lane * laneWidth + laneWidth / 2 - car.w / 2;
    ctx.fillRect(x, car.y, car.w, car.h);
  }
}

function drawPlayer(bike) {
  const x = player.lane * laneWidth + laneWidth / 2 - player.w / 2;
  ctx.fillStyle = bike.color;
  ctx.fillRect(x, player.y, player.w, player.h);
}

function drawMessage(text) {
  ctx.fillStyle = "#fff";
  ctx.font = "18px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}

// ---------- game loop ----------
function loop() {
  const bike = getSelectedBike();

  if (bike) {
    roadOffset += bike.speed;
    updateCars(bike);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoad();
  drawCars();

  if (bike) drawPlayer(bike);
  else drawMessage("Add a bike in the garage");

  requestAnimationFrame(loop);
}

loop();
# Rider

A lane-based motorbike dodging game built with plain HTML, CSS and JavaScript on a canvas. Pick a bike from your garage, weave through traffic and try not to crash.

## Features

- 4-lane road with a scrolling background
- Traffic cars that spawn randomly
- Garage where you manage your bikes (full CRUD):
  - **Create**: add a bike with a name, colour and speed
  - **Read**: see all your bikes in a list, with the selected one highlighted
  - **Update**: upgrade a bike's speed (and rename it)
  - **Delete**: sell a bike
- Bikes are saved in your browser with `localStorage`, so they're still there after a refresh
- The selected bike sets the player's colour and the road speed

## How to play

1. Add a bike in the garage (name, colour, speed 1 to 10).
2. Press **Select** on the bike you want to ride.
3. Use the **left and right arrow keys** to change lanes.
4. Avoid the red cars.

## Run it locally

1. Clone the repo:
   `git clone https://github.com/YOUR-USERNAME/rider.git`
2. Open the folder.
3. Open `index.html` in your browser, or use the Live Server extension in VS Code.

No build step or dependencies needed.

## Project structure

- `index.html`: page layout, garage form and canvas
- `garage.js`: bike CRUD, rendering and localStorage
- `game.js`: game loop, road, traffic and drawing

## Roadmap

- [x] Lanes and player movement
- [x] Scrolling road
- [x] Garage with CRUD and saved bikes
- [ ] Collision detection and game over
- [ ] Score and near-miss bonus
- [ ] Rename bikes
- [ ] Sound effects
- [ ] Better graphics

## What I learned

- Building a game loop with `requestAnimationFrame`
- Drawing on a canvas
- CRUD with arrays and the DOM
- Persisting data with `localStorage`

## License

MIT

let words = [];
function preload(){
  words = loadStrings('words.txt');
}

let targetRowColours;
let blocks = [];
let gridOffsetX = 60;                // Initial x offset for both grids
let gridOffsetY = 70;                // Initial y offset for the main grid
let targetGridOffsetX = gridOffsetX; // Target grid x offset
let blockWidth = 140;                // Increased block width for NYT style
let blockHeight = 80;                // Increased block height for NYT style
let gridSize = 150;                  // Adjusted grid size for spacing
let rowSize = 110;                   // Adjusted row spacing for both main and target grids

let targetGridOffsetY = gridOffsetY + rowSize * 4 + 30; // Adjusted y offset for the target grid

function setup() {
  // Define colours for target rows
  targetRowColours = [
    color(255, 255, 150), // yellow
    color(150, 255, 150), // green
    color(150, 150, 255), // blue
    color(200, 150, 255)  // purple
  ];
  createCanvas(750, 1000); // Increase canvas size to fit larger elements
  let index = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let x = gridOffsetX + col * gridSize;
      let y = gridOffsetY + row * rowSize;
      let b = new Block(x, y, blockWidth, blockHeight, 5, words[index]);
      blocks.push(b);
      index++;
    }
  }
}

function draw() {
  background(255);

  // Title
  textSize(26);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Leo's Connections Helper©️", width/2, 40);

  // Insturctions
  textSize(18);
  textAlign(CENTER, CENTER);
  fill(0);
  text('Drag the words onto the coloured boxs and shuffle unitl you see the connections.', width/2, 500)
  text('Once you think you have all 4 connections, input them into the Connections Game.', width/2, 525)

  // Draw labels for each row of the target grid
  textAlign(RIGHT, CENTER);
  textSize(16);
  fill(0);
  for (let row = 0; row < 4; row++) {
    let labelX = targetGridOffsetX - 10;
    let labelY = targetGridOffsetY + row * rowSize + blockHeight / 2;
    text(`${row + 1}.`, labelX, labelY);
  }

  // Draw the target grid (for visual aid)
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      fill(targetRowColours[row]);
      stroke(180);
      rect(targetGridOffsetX + col * gridSize, targetGridOffsetY + row * rowSize, blockWidth, blockHeight, 5);
    }
  }

  // Update and display each block
  for (let block of blocks) {
    block.drag(mouseX, mouseY);
    block.show();
  }
}

function mousePressed() {
  for (let block of blocks){
    block.pressed(mouseX, mouseY);
  }
}

function mouseReleased() {
  for (let block of blocks) {
    let snapped = false;

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        let targetX = targetGridOffsetX + col * gridSize;
        let targetY = targetGridOffsetY + row * rowSize;
        let snapThreshold = 60; // Adjust snap threshold for larger blocks
        if (dist(block.x, block.y, targetX, targetY) < snapThreshold) {
          block.x = targetX;
          block.y = targetY;
          snapped = true;
          break;
        }
      }
      if (snapped) break;
    }

    if (!snapped) {
      block.resetPosition();
    }

    block.release();
  }
}
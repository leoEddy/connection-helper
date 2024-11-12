let words = [];
function preload(){
  words = loadStrings('words.txt');
}

let targetRowColours;
let blocks = [];
let gridOffsetX = 30;                // Initial x offset for both grids
let gridOffsetY = 30;                // Initial y offset for the main grid
let targetGridOffsetX = gridOffsetX; // Target grid x offset
let blockWidth = 120;                // Increased Block width
let blockHeight = 70;                // Increased Block height
let gridSize = 130;                  // Increased Grid size for spacing
let rowSize = 90;                    // Adjusted Row spacing for layout

// Calculate target grid offset with a smaller gap
let targetGridOffsetY = gridOffsetY + rowSize * 4 + 10; // Reduced the gap to 10

function setup() {
  // Define colours for target rows
  targetRowColours = [
    color(255, 255, 150), // yellow
    color(150, 255, 150), // green
    color(150, 150, 255), // blue
    color(200, 150, 255)  // purple
  ];
  createCanvas(600, 850); // Adjusted canvas height for larger blocks
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
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Leo's Connection Helper©️", width / 2, 40);

  // Instructions
  textSize(16);
  text("Drag the words onto the coloured boxes and shuffle until you see the connections.", width / 2, 80);
  text("Once you think you have all 4 connections, input them into the Connections Game.", width / 2, 100);

  // Draw labels for each row of the target grid
  textAlign(RIGHT, CENTER);
  textSize(16);
  fill(0);
  for (let row = 0; row < 4; row++) {
    let labelX = targetGridOffsetX - 10;
    let labelY = targetGridOffsetY + row * rowSize + blockHeight / 2;
    text(`${row + 1}.`, labelX, labelY);
  }

  // Draw the target grid
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
        let snapThreshold = 50;
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
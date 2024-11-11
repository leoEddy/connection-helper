let words = [];
let god = 'dog'
function preload(){
  words = loadStrings('words.txt');
}

let targetRowColours
let blocks = [];
let gridOffsetX = 30;                // Initial x offset for both grids
let gridOffsetY = 10;                // Initial y offset for the main grid
let targetGridOffsetX = gridOffsetX; // Target grid x offset
let blockWidth = 100;
let blockHeight = 60;
let gridSize = 110;
let rowSize = 80                   // Original row spacing for both main and target grids

let targetGridOffsetY = gridOffsetY + rowSize * 4 + 20; // Adjusted y offset for the target grid

function setup() {
  // Define colours for target rows
  targetRowColours = [
    color(255, 255, 150),// yellow
    color(150, 255, 150),// green
    color(150, 150, 255),// blue
    color(200, 150, 255)// purple
  ]
  createCanvas(500, 700);
  let index = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let x = gridOffsetX + col * gridSize;
      let y = gridOffsetY + row * rowSize; // Use gridSize for main grid rows
      let b = new Block(x, y, blockWidth, blockHeight, 5, words[index]);
      blocks.push(b);
      index++;
    }
  }
}

function draw() {
  background(255);

  // Draw labels for each row of the target grid
  textAlign(RIGHT, CENTER);
  textSize(16);
  fill(0);
  for (let row = 0; row < 4; row++) {
    let labelX = targetGridOffsetX - 10;
    let labelY = targetGridOffsetY + row * rowSize + blockHeight / 2; // Use gridSize for consistent row spacing
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
  //  Check if the block is clicked and start dragging if so
  for (let block of blocks){
    block.pressed(mouseX, mouseY);
  }

}

function mouseReleased() {
  // Stop dragging when the mouse is released
  for (let block of blocks) {
    // Check if the block is close to any target cell in the target grid
    let snapped = false;

    // Iterate over each target cell to check for snapping
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        let targetX = targetGridOffsetX + col * gridSize;
        let targetY = targetGridOffsetY + row * rowSize;
        // Define a snap threshold (distance to snap to target cell)
        let snapThreshold = 50;
        if (dist(block.x, block.y, targetX, targetY) < snapThreshold) {
          // Snap block to target cell
          block.x = targetX;
          block.y = targetY;
          snapped = true;
          break;
        }
      }
      if (snapped) break;
    }

    // If the block didn't snap, reset it to its original position
    if (!snapped) {
      block.resetPosition();
    }

    // Stop dragging
    block.release();
  }
}





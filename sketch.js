let words = [];
function preload() {
  words = loadStrings('words.txt?' + new Date().getTime());}

let targetRowColours;
let blocks = [];
let gridOffsetX;
let gridOffsetY;
let targetGridOffsetX;
let targetGridOffsetY;
let blockWidth;
let blockHeight;
let gridSize;
let rowSize;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Set up colors for the target rows
  targetRowColours = [
    color(255, 255, 150),
    color(150, 255, 150),
    color(150, 150, 255),
    color(200, 150, 255),
  ];

  gridOffsetX = width * 0.02; // Left margin
  gridOffsetY = height * 0.07; // Top margin

  blockWidth = width / 4.5;
  blockHeight = height / 12;
  gridSize = blockWidth * 1.1;
  rowSize = blockHeight * 1.3;

  // Ensure the target grid is positioned below the word blocks
  targetGridOffsetX = gridOffsetX;
  targetGridOffsetY = gridOffsetY + 4 * rowSize + 50; // Add spacing after word blocks

  initializeBlocks(); // Create all blocks
}

function draw() {
  background(255);

  // Title text
  textSize(width / 20);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Leo's Connection Helper©️", width / 2, gridOffsetY / 2);

    // Instruction text
  textSize(width / 30);
  fill(100); // Slightly lighter color for the instructions
  text(
    "Drag and shuffle the blocks to guess the 4 connections.\n Then input them on the NYT Connections site!",
    width / 2,
    gridOffsetY + 4 * rowSize + 15 // Position instructions above the grid
  );

  // Render the target grid
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      fill(targetRowColours[row]);
      stroke(180);
      rect(
        targetGridOffsetX + col * gridSize,
        targetGridOffsetY + row * rowSize,
        blockWidth,
        blockHeight,
        10
      );
    }
  }

  // Render all blocks
  for (let block of blocks) {
    block.show(); // Ensure every block is displayed
  }
}

// Handle both mouse and touch interactions
function mousePressed() {
  for (let block of blocks) {
    block.pressed(mouseX, mouseY); // Use mouse coordinates
    if (block.dragging) break; // Stop if a block is being dragged
  }
}

function mouseDragged() {
  for (let block of blocks) {
    block.drag(mouseX, mouseY); // Use mouse coordinates
  }
}

function mouseReleased() {
  handleRelease();
}

function touchStarted() {
  if (touches.length > 0) {
    const tx = touches[0].x;
    const ty = touches[0].y;

    for (let block of blocks) {
      block.pressed(tx, ty); // Use touch coordinates
      if (block.dragging) break; // Stop if a block is being dragged
    }
    return false; // Prevent default touch behavior (like scrolling)
  }
  return true;
}

function touchMoved() {
  if (touches.length > 0) {
    const tx = touches[0].x;
    const ty = touches[0].y;

    for (let block of blocks) {
      block.drag(tx, ty); // Use touch coordinates
    }
    return false; // Prevent default touch behavior
  }
  return true;
}

function touchEnded() {
  handleRelease();
  return false; // Prevent default touch behavior
}

function handleRelease() {
  for (let block of blocks) {
    let snapped = false;

    // Calculate the block's center
    const blockCenterX = block.x + blockWidth / 2;
    const blockCenterY = block.y + blockHeight / 2;

    // Calculate the closest grid cell
    const closestCol = Math.floor((blockCenterX - targetGridOffsetX) / gridSize);
    const closestRow = Math.floor((blockCenterY - targetGridOffsetY) / rowSize);

    // Ensure the calculated grid cell is within bounds
    if (
      closestCol >= 0 &&
      closestCol < 4 &&
      closestRow >= 0 &&
      closestRow < 4
    ) {
      // Snap the block to the center of the calculated grid cell
      block.x = targetGridOffsetX + closestCol * gridSize;
      block.y = targetGridOffsetY + closestRow * rowSize;
      snapped = true;
    }

    // If the block wasn't snapped, reset its position
    if (!snapped) {
      block.resetPosition();
    }

    // Reset dragging state for the block
    block.release();
  }
}

function initializeBlocks() {
  blocks = [];
  let index = 0;

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let x = gridOffsetX + col * gridSize;
      let y = gridOffsetY + row * rowSize;
      let b = new Block(x, y, blockWidth, blockHeight, 10, words[index]);
      blocks.push(b);
      index++;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  gridOffsetX = width * 0.02;
  gridOffsetY = height * 0.05;

  blockWidth = width / 4.5;
  blockHeight = height / 12;
  gridSize = blockWidth * 1.1;
  rowSize = blockHeight * 1.3;

  // Ensure the target grid is positioned below the word blocks
  targetGridOffsetX = gridOffsetX;
  targetGridOffsetY = gridOffsetY + 4 * rowSize + 50; // Add spacing after word blocks

  initializeBlocks();
}
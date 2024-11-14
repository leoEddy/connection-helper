let words = [];
let god = 'dog'
function preload(){
  words = loadStrings('words.txt');
}

let targetRowColours;
let blocks = [];
let gridOffsetX = 60;                // Initial x offset for both grids
let gridOffsetY = 100;               // Increased y offset for more top spacing
let targetGridOffsetX = gridOffsetX; // Target grid x offset
let blockWidth = 120;                // Block width
let blockHeight = 70;                // Block height
let gridSize = 130;                  // Grid size for spacing
let rowSize = 90;                    // Row spacing for layout

let targetGridOffsetY = gridOffsetY + rowSize * 4 + 20; // Target grid offset, slight gap between grids

function setup() {
  targetRowColours = [
    color(255, 255, 150), // yellow
    color(150, 255, 150), // green
    color(150, 150, 255), // blue
    color(200, 150, 255)  // purple
  ];
  createCanvas(650, 850);
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

  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Leo's Connection Helper©️", width / 2, 40);

  textSize(16);
  text("Drag the words onto the coloured boxes and shuffle until you see the connections.", width / 2, 70);
  text("Once you think you have all 4 connections, input them into the Connections Game.", width / 2, 90);

  textAlign(RIGHT, CENTER);
  textSize(16);
  fill(0);
  for (let row = 0; row < 4; row++) {
    let labelX = targetGridOffsetX - 10;
    let labelY = targetGridOffsetY + row * rowSize + blockHeight / 2;
    text(`${row + 1}.`, labelX, labelY);
  }

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      fill(targetRowColours[row]);
      stroke(180);
      rect(targetGridOffsetX + col * gridSize, targetGridOffsetY + row * rowSize, blockWidth, blockHeight, 5);
    }
  }

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
  handleRelease();
}

// Touch support for mobile
function touchStarted() {
  if (touches.length > 0) {
    const tx = touches[0].x;
    const ty = touches[0].y;
    console.log("Touch started at:", tx, ty);
    for (let block of blocks) {
      block.pressed(tx, ty);
    }
  }
  return false;
}

function touchMoved() {
  if (touches.length > 0) {
    const tx = touches[0].x;
    const ty = touches[0].y;
    for (let block of blocks) {
      block.drag(tx, ty);
    }
  }
  return false;
}

function touchEnded() {
  console.log("Touch ended");
  handleRelease();
  return false;
}

function handleRelease() {
  for (let block of blocks) {
    let snapped = false;

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        let targetX = targetGridOffsetX + col * gridSize;
        let targetY = targetGridOffsetY + row * rowSize;
        let snapThreshold = 50;
        if (dist(block.x, block.y, targetX, targetY) < snapThreshold) {
          console.log("Block snapped to target at:", targetX, targetY);
          block.x = targetX;
          block.y = targetY;
          snapped = true;
          break;
        }
      }
      if (snapped) break;
    }

    if (!snapped) {
      console.log("Block returned to initial position:", block.initialX, block.initialY);
      block.resetPosition();
    }

    block.release();
  }
}
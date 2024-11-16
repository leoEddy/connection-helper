class Block {
    constructor(x, y, w, h, r, label) {
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      this.radius = r;
      this.label = label;
      this.dragging = false;
      this.offsetX = 0;
      this.offsetY = 0;
      this.startX = x;
      this.startY = y;
    }
  
    show() {
      fill(220, 100);
      noStroke();
      strokeWeight(1);
      rect(this.x, this.y, this.width, this.height, this.radius);
  
      // Adjust text size to fit the block
      let textSizeValue = 16; // Default text size
      if (this.label.length > 7){
          textSizeValue = 12; // Smaller text for longer words
      } 
      textSize(textSizeValue);
      textStyle(BOLD);
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      text(this.label, this.x + this.width / 2, this.y + this.height / 2);
    }
  
    pressed(px, py) {
      if (
        px > this.x &&
        px < this.x + this.width &&
        py > this.y &&
        py < this.y + this.height
      ) {
        this.dragging = true;
        this.offsetX = this.x - px;
        this.offsetY = this.y - py;
      }
    }
  
    drag(px, py) {
      if (this.dragging) {
        this.x = px + this.offsetX;
        this.y = py + this.offsetY;
      }
    }
  
    release() {
      this.dragging = false;
    }
  
    resetPosition() {
      this.x = this.startX;
      this.y = this.startY;
    }
  
    isTouchWithin(tx, ty) {
      return (
        tx > this.x &&
        tx < this.x + this.width &&
        ty > this.y &&
        ty < this.y + this.height
      );
    }
  }
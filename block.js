class Block {
    constructor(x, y, w, h, r, t) {
      this.initialX = x; // Save initial position
      this.initialY = y;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.r = r;
      this.t = t;
      this.dragging = false;
      this.offsetX = 0;
      this.offsetY = 0;
    }
  
    pressed(px, py) {
      if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h) {
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
      this.x = this.initialX;
      this.y = this.initialY;
    }
  
    show() {
      stroke(255);
      fill(200, 125);
      rect(this.x, this.y, this.w, this.h, this.r);
  
      let textSizeValue = 18; // Default text size
      if (this.t.length > 10) {
        textSizeValue = 16; // Smaller text for longer words
      }
      fill(0);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      textSize(textSizeValue);
      text(this.t, this.x + this.w / 2, this.y + this.h / 2);
    }
  }
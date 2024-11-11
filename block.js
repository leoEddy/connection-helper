class Block {
    constructor(x, y, w, h, r, t){
        this.initialX = x; // Save initial position
        this.initialY = y;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.t = t
        this.dragging = false; // Track if block is beingn pressed
        this.offsetX = 0;  // To store offset when clickng on block
        this.offsetY = 0;
    }

    // Check if block is clicked, if so, start dragging
    pressed(px, py){
       if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h){
        this.dragging = true;
        // Claculate offset so block movement is smooth
        this.offsetX = this.x - px;
        this.offsetY = this.y - py;
       }   
    }
    // Update postion if dragging
    drag(px, py){
        if (this.dragging) {
            this.x = px + this.offsetX;
            this.y = py + this.offsetY;
        }
    }

    // Stop dragging on release
    release(){
        this.dragging = false;
    }

    resetPosition(){
        this.x = this.initialX;
        this.y = this.initialY;
    }

    // Show the block with centred text
    show(){
        stroke(255)
        fill(200, 125);
        rect(this.x, this.y, this.w, this.h, this.r);

        // Centre the text on the block
        // Adjust text size boased on word length
        let textSizeValue = 18; // Default text size
        if (this.t.length > 8){
            textSizeValue = 12; // Smaller text for longer words
        } else if (this.t.length > 6){
            textSizeValue = 16; // Medium text size for moderately longer words
        }
        fill(0);
        textAlign(CENTER, CENTER);
        textStyle(BOLD)
        textSize(textSizeValue)
        text(this.t, this.x + this.w/2, this.y + this.h/2);

    }
}
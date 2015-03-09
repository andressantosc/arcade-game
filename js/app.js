// Both the player object and the Enemy object use the same render method. 
// Used delegation so that each object can access it.
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Create class for Enemies our player must avoid
var Enemy = function(x, y){
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    // Make the speed be a random number between 150 and 350
    this.speed = Math.floor((Math.random() * 350) + 150);;
}

// Update the enemy's position
Enemy.prototype.update = function(dt){
    // Updates position by speed. If it leaves
    // the canvas, it returns to the original position. 
    if (this.x <= 505) {
        this.x += this.speed * dt;
    }
    else {
        this.x = -10;
    }

    // Check for collisions
    // First check if player is within y distance
    if (player.y >= this.y - 50 && player.y <= this.y + 50) {
        // Then check if player is within x distance
        if (player.x >= this.x - 50 && player.x <= this.x + 50) {
            // If true, collision occurs and the player resets
            player.reset();
            // update score here!
        }
    }
}

// Create class for the player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
}

// Update player position by listening to keys pressed
// restricting the player from moving off canvas
Player.prototype.update = function() {
    if(this.key === 'left' && this.x > 0) {
        this.x = this.x - 100;
    }
    else if(this.key === 'right' && this.x < 400) {
        this.x = this.x + 100;
    }
    else if(this.key === 'up' && this.y > 0) {
        this.y = this.y - 85;
    }
    else if(this.key === 'down' && this.y < 400) {
        this.y = this.y + 85;
    }
    this.key = null;

    // If player crosses the water, reset the player
    if (this.y < 0) {
        this.reset();
        // update score here!
    }
}

// Method for storing key input in the object
Player.prototype.handleInput = function(e) {
    this.key = e;
}

// Method for resetting the player to initial position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
}

// Intantiate the player for the game
var player = new Player();

// Instantiate three Enemy objects to start in the three stone rows.
var allEnemies = [new Enemy(-10, 60), new Enemy(-10, 145), new Enemy(-10, 230)];

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

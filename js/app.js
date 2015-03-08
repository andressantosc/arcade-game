// Both the player object and the Enemy object use the same render method. 
// Used delegation so that each object can access it.
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemies our player must avoid
var Enemy = function(x, y){
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 190;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt){
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505) {
        this.x += this.speed * dt;
    }
    else {
        this.x = -10;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
}

Player.prototype.update = function() {
    if(this.key === 'left') {
        this.x = this.x - 100;
    }
    else if(this.key === 'right') {
        this.x = this.x + 100;
    }
    else if(this.key === 'up') {
        this.y = this.y - 85;
    }
    else if(this.key === 'down') {
        this.y = this.y + 85;
    }
    this.key = null;
}

Player.prototype.handleInput = function(e) {
    this.key = e;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

// Instantiate three Enemy objects to start in the three stone rows.
var allEnemies = [new Enemy(-10, 55), new Enemy(-10, 140), new Enemy(-10, 225)];

// This listens for key presses and sends the keys to your
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

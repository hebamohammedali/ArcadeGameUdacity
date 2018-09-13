

var intialX = 200;
var intialY = 300;
var intialEnemyPostion = -10;

// Enemies our player must avoid
var Enemy = function(xAxis, yAxis, enemySpeed) {
	'use strict';
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = xAxis;
	this.y = yAxis;
	this.enemyspeed = enemySpeed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	'use strict';
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x =  this.x + this.enemyspeed * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 505)
	{
        this.x = intialEnemyPostion;
	}

    // Check for collision between player and enemies
	var width = 40;
    if (player.x < this.x + width && player.x + width > this.x &&
        player.y < this.y + width && player.y + width > this.y) 
		{
			player.x = intialX;
			player.y = intialY;
		
			document.body.style.backgroundImage = "url('images/loser.png')"; 
			setTimeout(function () {
				document.body.style.backgroundImage = "none"; 
			}, 800);
    } 
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function(x, y, speed) {
	'use strict';
	
	
	this.sprite = 'images/char-pink-girl.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

Player.prototype.update = function() {
	
	'use strict';
	
	boundies();

    // check if the player reach to the water and win
    if (this.y < 0) {
        this.x = intialX;
        this.y = intialY;
		
		document.body.style.backgroundImage = "url('images/winner.png')"; 
        setTimeout(function () {
            document.body.style.backgroundImage = "none"; 
		}, 800);
    }
};

//Function to detect the player in X-axis range or not.
var inXrange = function isInXrange(x)
{
	'use strict';
  if ((x > 0) && (x < 505))
  {
    return true;
  }
  else
  {
    return false;
  }
};

//Function to detect the player in Y-axis range or not.
var inYrange = function isInYrange(y)
{
	'use strict';
  if ((y > 0) && (y < 606))
  {
    return true;
  }
  else
  {
    return false;
  }
};

//Function to detect if he player out of the boundries or not.
var boundies = function OutofBoundries()
{
	'use strict';
	
	if (inXrange(player.x > 400)) 
	{
        player.x = 400;
	}
	
	if (inXrange(player.x < 0))
	{
        player.x = 0;
	}
	
    if (inYrange(player.y > 300))
	{
        player.y = 300;
	}
};



Player.prototype.render = function() {
	'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The movement of the player with the arrowKeys
Player.prototype.handleInput = function(keyPress) {
	'use strict';
	
	if(keyPress === 'right')
	{
		this.x = this.x + this.speed + 50;
	}
	
	if(keyPress === 'left')
	{
		 this.x = this.x - (this.speed + 50);
	}
	
	if(keyPress === 'up')
	{
		this.y = this.y - (this.speed + 40);
	}
	
	if(keyPress === 'down')
	{
		this.y = this.y + this.speed + 40;
	}
  
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200, 300, 50);

var enemyPosition = [60, 145, 230];
enemyPosition.forEach(function(posY) {
	'use strict';
	var NewEnemy;
    NewEnemy = new Enemy(0, posY, 100 + Math.random() * 350);
    allEnemies.push(NewEnemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	'use strict';
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
[Koala Jump Live][koala-jump]

[koala-jump]: http://kasperkuo.github.io/koala-jump/

## Instructions

Use the left and right arrow keys to maneuver the koala. The objective of the game is to survive as long as possible. Falling off the platforms to the bottom of the screen will result in a game over.

## Game Design

This game was created with:

- Javascript
- HTML5 Canvas
- Google Font API

## Featured Technical Implementations

Koala Jump is a platform jumper that requires infinite scrolling. Infinite scrolling is done by two major principles--moving platforms down and generating new platforms.

To move platforms down, the `Game#rerenderPlatforms` function was used. To make smooth platform scrolling, the platforms move only when the koala moves past half of the screen, which contains dimensions `DIM_Y / 2`. `Game#rerenderPlatforms` acquires all platforms present on the screen and iterates through each one. Once it meets the conditional `this.koala.y < this.DIM_Y/2`, all platforms will move down as many pixels as the koala accelerates upwards. This is demonstrated in the code snippet below:

```
Game.prototype.rerenderPlatforms = function() {
  var platforms = this.platforms;
  for (var i = 0; i < platforms.length; i++) {
    if (this.koala.y < this.DIM_Y/2) {
      if (this.koala.vel[1] > 0) {
        platforms[i].y += this.koala.vel[1];
        this.gameScore += this.koala.vel[1];
      }
    }
  }
};
```

New platforms are added once pre-existing platforms leave the bottom of the screen (`if (platforms[i].y > this.DIM_Y)`). When this occurs, the current platform is removed from the list of platforms. Simultaneously, a `new Platform(x, y)` is added. The x and y coordinates are generated by `Game#randomInt(min,max)`.

```
Game.prototype.addPlatform = function() {
  var platforms = this.platforms;
  for (var i = 0; i < platforms.length; i++) {
    if (platforms[i].y > this.DIM_Y) {
      this.platforms.splice(i, 1);
      this.platforms.push(
        new Platform({x: randomInt(5, 460), y:randomInt(100, 200)})
      );
    }
  }
};
```

Another important feature that is crucial to the game is executing gravity physics. Since the character is consistently going to be jumping, is must start off with a set initial `Koala.vel = [0, 10]`. As each frame is rendered, the koala;s velocity in the y direction, or `Koala.vel[1]`, is decreased by a small value. Eventually, the koala will fall once it reaches 0 velocity. This gravitational pull will continue to force the koala to full until it either reaches the bottom of the screen or until it collides with a platform (`Koala#isCollided(otherObject)`).

```
Koala.prototype.isCollided = function(otherObject) {
  var dy = (this.y - this.radius);
  if ((dy <= otherObject.y + otherObject.height/2 + 10) &&
        (dy > otherObject.y - 10) &&
        (this.x > otherObject.x - this.radius) &&
          (this.x <= otherObject.x + otherObject.width + this.radius) &&
            this.falling === true ) {
            return true;
          } else {
          return false;
        }
};
```

## Future Features

- Multiple types of platforms (moving, broken)
- Introduction of monsters
- Introduction of power-ups
- Increased difficulty with increased monster count and fewer platforms
- Persistent High Score
- Restarting game without hard reloading the page
- Improved graphics

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

To move platforms down, the `Game#rerenderPlatforms` function was used. To make smooth platform scrolling, the platforms move only when the koala moves past half of the screen, which contains dimensions `DIM_Y / 2`. `Game#rerenderPlatforms` acquires all platforms present on the screen and iterates through each one. Once it meets the conditional `this.koala.y`

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

To add platforms,

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

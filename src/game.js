

var sprites = {
  frog: { sx: 0, sy: 0, w: 48, h: 48, frames: 1 },
   bg: { sx: 433, sy: 0, w: 320, h: 528, frames: 1 },
  car1: { sx: 143, sy: 0, w: 48, h: 48, frames: 1 }, //left
  car2: { sx: 191, sy: 0, w: 48, h: 48, frames: 1 }, //right
  car3: { sx: 239, sy: 0, w: 96, h: 48, frames: 1 }, //left
  car4: { sx: 335, sy: 0, w: 48, h: 48, frames: 1 }, //left
  car5: { sx: 383, sy: 0, w: 48, h: 48, frames: 1 }, //right
  trunk: { sx: 288, sy: 383, w: 142, h: 48, frames: 1 },
  snake: { sx: 0, sy: 384, w: 90, h: 46 , frames: 3},
  insect: { sx: 96, sy: 288, w: 40, h: 40 , frames: 1},  
  death: { sx: 0, sy: 143, w: 48, h: 48, frames: 4 }
};

var enemies = {
  /*
  straight: { x: 0,   y: -50, sprite: 'enemy_ship', health: 10, 
              E: 100 },
  ltr:      { x: 0,   y: -100, sprite: 'enemy_purple', health: 10, 
              B: 75, C: 1, E: 100, missiles: 2  },
  circle:   { x: 250,   y: -50, sprite: 'enemy_circle', health: 10, 
              A: 0,  B: -100, C: 1, E: 20, F: 100, G: 1, H: Math.PI/2 },
  wiggle:   { x: 100, y: -50, sprite: 'enemy_bee', health: 20, 
              B: 50, C: 4, E: 100, firePercentage: 0.001, missiles: 2 },
  step:     { x: 0,   y: -50, sprite: 'enemy_circle', health: 10,
              B: 150, C: 1.2, E: 75 }
  */

  //f indicates the file (1-4) 1 is the lowest

  car1: { x: 320,   f: 1, sprite: 'car1', v: 20, d:'left' },

  car2: { x: -48,   f: 1, sprite: 'car2', v: 50, d:'right'},

  car3: { x: 320,   f: 1, sprite: 'car3', v: 30, d:'left'},

  car4: { x: 320,   f: 1, sprite: 'car4', v: 80, d:'left'},

  car5: { x: -48,   f: 1, sprite: 'car5', v: 60, d:'right' },
    
  snake: { x: 0, y: 240, sprite: 'snake', v: 10},
    
  insect: { x: 0, y: 192, sprite: 'insect', v: 10}

};

//f indicates the file (1-3) 1 is the lowest
var allies = {

  trunk: { f: 1, sprite: 'trunk', v: 10}

};

/*
var position: {

  p1:{},
  p2:{},
  p3:{},
  p4:{},
  p5:{}
};
*/

var OBJECT_PLAYER = 1,
    OBJECT_ENEMY = 2,
    OBJECT_TRUNK= 4;
    OBJECT_INSECT = 8;
    OBJECT_GOAL= 16;


var startGame = function() {
  var ua = navigator.userAgent.toLowerCase();
    
  Game.numberLevels = 1;
    
  Game.currentLevel = 1;

  // Only 1 row of stars
  /*
  if(ua.match(/android/)) {
    Game.setBoard(0,new Starfield(50,0.6,100,true));
  } else {
    Game.setBoard(0,new Starfield(20,0.4,100,true));
    Game.setBoard(1,new Starfield(50,0.6,100));
    Game.setBoard(2,new Starfield(100,1.0,50));
  }  
  */
    
  //Background
  var backgroundBoard = new GameBoard();
  backgroundBoard.add(new Background());
  Game.setBoard(0,backgroundBoard);
    
  //Start Screen (StartScreen board and Entites board share the same position)
  Game.setBoard(1,new TitleScreen("FROGGER", 
                                  "Press space to start playing",
                                  playGame));
  
  //Win screen
  Game.setBoard(2,new TitleScreen("You win!", 
                                  "Press space to play again",
                                  playGame));

  Game.setBoard(3,new TitleScreen("You lose!", 
                                  "Press space to play again",
                                  playGame));
    
  Game.setBoard(4,new GamePoints(0));
    
  Game.setActiveBoard(2,false);
      
  Game.setActiveBoard(3,false);
    
};

/*
var level1 = [
 // Start,   End, Gap,  Type,   Override
  [ 0,      4000,  500, 'step' ],
  [ 6000,   13000, 800, 'ltr' ],
  [ 10000,  16000, 400, 'circle' ],
  [ 17800,  20000, 500, 'straight', { x: 50 } ],
  [ 18200,  20000, 500, 'straight', { x: 90 } ],
  [ 18200,  20000, 500, 'straight', { x: 10 } ],
  [ 22000,  25000, 400, 'wiggle', { x: 150 }],
  [ 22000,  25000, 400, 'wiggle', { x: 100 }]
];
*/

var level1 = [
  // Start, Gap,  Type,   Override
  [ 0, 7000, 'car1', {f:1, v:300} ],
  //[ 0, 5000, 'car2', {f:2, v:150}],
  //[ 0, 5500, 'car3', {f:3, v:250}],
  //[ 0, 3300, 'car4', {f:4, v:150}],
  //[ 0, 180000, 'snake', {v: 50}], //3 minutes to resawn snake (level should be finished before 3 minutes)
  //[ 0, 180000, 'insect', {v: 50}], //3 minutes to resawn snake (level should be finished before 3 minutes)
  [ 0, 2500, 'trunk', {f:1,v:100}],
  [ 0, 4000, 'trunk', {f:2,v:200}],
  [ 0, 5000, 'trunk', {f:3,v:-100}]
];

var level2 = [
  // Start, Gap,  Type,   Override
  //[ 0, 5000, 'car1', {f:1, v:300} ],
  //[ 0, 3000, 'car2', {f:2, v:150}],
  //[ 0, 2500, 'car3', {f:3, v:250}],
  //[ 0, 1300, 'car4', {f:4, v:150}],
  //[ 0, 180000, 'snake', {v: 50}], //3 minutes to resawn snake (level should be finished before 3 minutes)
  //[ 0, 180000, 'insect', {v: 50}], //3 minutes to resawn snake (level should be finished before 3 minutes)
  [ 0, 3500, 'trunk', {f:1,v:100}],
  [ 0, 3000, 'trunk', {f:2,v:200}],
  [ 0, 5000, 'trunk', {f:3,v:-100}]
];


var playGame = function() {
    
  //Deactivate win / loose screens
      
  Game.setActiveBoard(2,false);
      
  Game.setActiveBoard(3,false);
    
  //Entities
  var board = new GameBoard();


  /*
  board.add(new Car(enemies.car1,{f:1}));
  board.add(new Car(enemies.car2,{f:2}));
  board.add(new Car(enemies.car3,{f:3}));
  board.add(new Car(enemies.car5,{f:4}));
  board.add(new Trunk(allies.trunk,{f:1, v:20}));
  board.add(new Trunk(allies.trunk,{f:2, v:-20}));
  board.add(new Trunk(allies.trunk,{f:3, v:20}));
  board.add(new Water());
  board.add(new Home());
  */
    
  board.add(new Water());
  board.add(new Home());
    
    
  if(Game.currentLevel == 1){
    board.add(new Level(level1));
  }
  if(Game.currentLevel == 2){
    board.add(new Level(level2));
  }

    
  board.add(new Frog(3));
    
  //board.add(new Level(level1,winGame));
    
  Game.setBoard(1,board);
};

var winGame = function() {
  Game.setActiveBoard(2,true);
    
  Game.points = 0;
    
  Game.currentLevel = 1;
};

var loseGame = function() {
  Game.setActiveBoard(3,true);
    
  Game.points = 0;
};


var nextLevel = function(){
    
  console.log("Previous level: " + Game.currentLevel);
    
  Game.currentLevel++;  
    
  if(Game.currentLevel > Game.numberLevels){
          
    winGame();
  }
  else{
    playGame();    
  }
};

/*
var Starfield = function(speed,opacity,numStars,clear) {

  // Set up the offscreen canvas
  var stars = document.createElement("canvas");
  stars.width = Game.width; 
  stars.height = Game.height;
  var starCtx = stars.getContext("2d");

  var offset = 0;

  // If the clear option is set, 
  // make the background black instead of transparent
  if(clear) {
    starCtx.fillStyle = "#000";
    starCtx.fillRect(0,0,stars.width,stars.height);
  }

  // Now draw a bunch of random 2 pixel
  // rectangles onto the offscreen canvas
  starCtx.fillStyle = "#FFF";
  starCtx.globalAlpha = opacity;
  for(var i=0;i<numStars;i++) {
    starCtx.fillRect(Math.floor(Math.random()*stars.width),
                     Math.floor(Math.random()*stars.height),
                     2,
                     2);
  }

  // This method is called every frame
  // to draw the starfield onto the canvas
  this.draw = function(ctx) {
    var intOffset = Math.floor(offset);
    var remaining = stars.height - intOffset;

    // Draw the top half of the starfield
    if(intOffset > 0) {
      ctx.drawImage(stars,
                0, remaining,
                stars.width, intOffset,
                0, 0,
                stars.width, intOffset);
    }

    // Draw the bottom half of the starfield
    if(remaining > 0) {
      ctx.drawImage(stars,
              0, 0,
              stars.width, remaining,
              0, intOffset,
              stars.width, remaining);
    }
  };

  // This method is called to update
  // the starfield
  this.step = function(dt) {
    offset += dt * speed;
    offset = offset % stars.height;
  };
};

var PlayerShip = function() { 
  this.setup('ship', { vx: 0, reloadTime: 0.25, maxVel: 200 });

  this.reload = this.reloadTime;
  this.x = Game.width/2 - this.w / 2;
  this.y = Game.height - Game.playerOffset - this.h;

  this.step = function(dt) {
    if(Game.keys['left']) { this.vx = -this.maxVel; }
    else if(Game.keys['right']) { this.vx = this.maxVel; }
    else { this.vx = 0; }

    this.x += this.vx * dt;

    if(this.x < 0) { this.x = 0; }
    else if(this.x > Game.width - this.w) { 
      this.x = Game.width - this.w;
    }

    this.reload-=dt;
    if(Game.keys['fire'] && this.reload < 0) {
      Game.keys['fire'] = false;
      this.reload = this.reloadTime;

      this.board.add(new PlayerMissile(this.x,this.y+this.h/2));
      this.board.add(new PlayerMissile(this.x+this.w,this.y+this.h/2));
    }
  };
};

PlayerShip.prototype = new Sprite();
PlayerShip.prototype.type = OBJECT_PLAYER;

PlayerShip.prototype.hit = function(damage) {
  if(this.board.remove(this)) {
    loseGame();
  }
};


var PlayerMissile = function(x,y) {
  this.setup('missile',{ vy: -700, damage: 10 });
  this.x = x - this.w/2;
  this.y = y - this.h; 
};

PlayerMissile.prototype = new Sprite();
PlayerMissile.prototype.type = OBJECT_PLAYER_PROJECTILE;

PlayerMissile.prototype.step = function(dt)  {
  this.y += this.vy * dt;
  var collision = this.board.collide(this,OBJECT_ENEMY);
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if(this.y < -this.h) { 
      this.board.remove(this); 
  }
};


var Enemy = function(blueprint,override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite,blueprint);
  this.merge(override);
};

Enemy.prototype = new Sprite();
Enemy.prototype.type = OBJECT_ENEMY;

Enemy.prototype.baseParameters = { A: 0, B: 0, C: 0, D: 0, 
                                   E: 0, F: 0, G: 0, H: 0,
                                   t: 0, reloadTime: 0.75, 
                                   reload: 0 };

Enemy.prototype.step = function(dt) {
  this.t += dt;

  this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
  this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);

  this.x += this.vx * dt;
  this.y += this.vy * dt;

  var collision = this.board.collide(this,OBJECT_PLAYER);
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  }

  if(Math.random() < 0.01 && this.reload <= 0) {
    this.reload = this.reloadTime;
    if(this.missiles == 2) {
      this.board.add(new EnemyMissile(this.x+this.w-2,this.y+this.h));
      this.board.add(new EnemyMissile(this.x+2,this.y+this.h));
    } else {
      this.board.add(new EnemyMissile(this.x+this.w/2,this.y+this.h));
    }

  }
  this.reload-=dt;

  if(this.y > Game.height ||
     this.x < -this.w ||
     this.x > Game.width) {
       this.board.remove(this);
  }
};

Enemy.prototype.hit = function(damage) {
  this.health -= damage;
  if(this.health <=0) {
    if(this.board.remove(this)) {
      Game.points += this.points || 100;
      this.board.add(new Explosion(this.x + this.w/2, 
                                   this.y + this.h/2));
    }
  }
};

var EnemyMissile = function(x,y) {
  this.setup('enemy_missile',{ vy: 200, damage: 10 });
  this.x = x - this.w/2;
  this.y = y;
};

EnemyMissile.prototype = new Sprite();
EnemyMissile.prototype.type = OBJECT_ENEMY_PROJECTILE;

EnemyMissile.prototype.step = function(dt)  {
  this.y += this.vy * dt;
  var collision = this.board.collide(this,OBJECT_PLAYER)
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if(this.y > Game.height) {
      this.board.remove(this); 
  }
};



var Explosion = function(centerX,centerY) {
  this.setup('explosion', { frame: 0 });
  this.x = centerX - this.w/2;
  this.y = centerY - this.h/2;
};

Explosion.prototype = new Sprite();

Explosion.prototype.step = function(dt) {
  this.frame++;
  if(this.frame >= 12) {
    this.board.remove(this);
  }
};
*/

window.addEventListener("load", function() {
  Game.initialize("game",sprites,startGame);
});


/*
Frogger Methods
*/

var Background = function() { 

  this.setup('bg', {});

  this.x = 0;
  this.y = 0;


  this.step = function(dt) {};

};

Background.prototype = new Sprite();

var Frog = function(lives) { 

  //reloadTime and level time is in seconds
  this.setup('frog', {reloadTime: 0.10, levelTime: 60});
  this.zIndex = 0;

  this.reload = this.reloadTime;
  this.x = Game.width/2 - this.w / 2;
  this.y = Game.height - this.h;
  this.vx = 0; //Trunk movement
  this.overTrunk = false; //Checks if the frog is over the trunk
  this.count = 0;
  this.movable = true;
    
  Game.lives = lives;
    
  this.time = this.levelTime;
    
    
  //To control points increase
  this.currentPosition = 0;
    
  this.mostAdvancedPosition = 0;
    
  this.rotation = 0;

  this.step = function(dt) {


    //Collision with trunks
    var collision_t = this.board.collide(this,OBJECT_TRUNK);

    if(collision_t) {
      //console.log("Trunk collision detected");
        
      this.onTrunk(collision_t.v);
      this.x = this.x + this.vx * dt;
        
      //console.log("Updated Position: " + this.x);
      //this.board.remove(this);
    }
      
    //Collision with enemies (Water is considered an enemy)

    //Check if the frog is over the trunk 
    if(!this.overTrunk){ 
      
        var collision_e = this.board.collide(this,OBJECT_ENEMY);

        if(collision_e) {

            collision_e.hit();
            this.hit();
        
            //this.board.add(new Death (this.x,this.y));
            //this.board.remove(this);   
        }
    }
      
    //Collision with home
    var collision_t = this.board.collide(this,OBJECT_GOAL);

    if(collision_t) {
      //console.log("Trunk collision detected");
        
        
      if(this.movable) Game.points += this.points || 100;
        
      if(Game.currentLevel == Game.numberLevels){
            this.movable = false;
      }

      collision_t.hit();
    
      //console.log("Updated Position: " + this.x);
      //this.board.remove(this);
    }
      
    //Collision with insects
    var collision_t = this.board.collide(this,OBJECT_INSECT);

    if(collision_t) {
      
        
        collision_e.hit();
    }
      
      //Animation
      
      //console.log("Current Count: " + this.count);
      
      if(this.count >= 1){

          //console.log("Current Frame: " + this.frame);
          
          this.count++;

          if(this.count % 5 == 0){
              this.frame++;
          }

         if(this.frame >= 3 ) {

              this.frame = 0;
              this.count = 0;
         }

      }


      
    if((this.reload <= 0)&&this.movable){

      if(Game.keys['left']) { this.x -= 48; this.count = 1; this.frame = 1; this.rotate=Math.PI + Math.PI / 2;}
      else if(Game.keys['right']) { this.x += 48 ; this.count = 1; this.frame = 1;this.rotate= Math.PI / 2}
      else if(Game.keys['up']) { this.y -= 48; this.count = 1; this.frame = 1; 
                                
                                this.rotate=0;
                            
                                this.currentPosition++; 
                                
                                    if(this.mostAdvancedPosition < this.currentPosition){

                                        Game.points += this.points || 10;

                                        this.mostAdvancedPosition = this.currentPosition;
                                    }
                               }
      else if(Game.keys['down']) { this.y += 48;  this.count = 1; this.frame = 1;
                                  
                                    this.rotate = Math.PI;
                                 
                                 
                                    if(this.currentPosition != 0){
                                        
                                        this.currentPosition--;
                                    }
                                 }
    
      if(this.x < 0) { this.x = 0; }
      else if(this.x > Game.width - this.w) { 
        this.x = Game.width - this.w;
      }

      if(this.y < 0) { this.y = 0; }
      else if(this.y > Game.height - this.h) { 
        this.y = Game.height - this.h;
      }

      this.reload = this.reloadTime;
    }

    this.reload-= dt;
      
    this.vx = 0;
      
    this.overTrunk = false;
      
    
    if(this.movable){
        
        //Timer (time passes if the frog can move) 
        this.time -= dt;
        
    }
      
    //If the time passes, is like it has been hit  
    if(this.time < 0){
        this.hit();   
    }
    
    

    //console.log("Reload: " + this.reload);
    
  };
    
  //Override the dra metho to paint the frog, lives and time
  this.draw = function(ctx){
      
    console.log("Rotation: " + this.rotate);
      
    ctx.save();
      
    ctx.rotate(this.rotate);
      
    ctx.restore();
      
    ctx.save();
      
    //Draw the Frog
      
    SpriteSheet.draw(ctx,this.sprite,this.x,this.y,this.frame);
      
    //Draw the time counter
      
    ctx.font = "bold 18px arial";
    ctx.fillStyle= "#FFFFFF";

    var txt = "Time: "; 
      
    ctx.fillText(txt,240,20);
      
    if(this.time < 10) 
    {
        ctx.fillStyle= "#FF0000";
    } 
    
    txt = Math.floor(this.time);
      
      

    ctx.fillText(txt,292,20);
    ctx.restore();
      
    //Draw the number of lives
    ctx.font = "bold 18px arial";
    ctx.fillStyle= "#FFFFFF";

    SpriteSheet.drawScale(ctx,this.sprite,175,0,24,24,0);
      
    var txt = "x" + Game.lives;
      
    ctx.fillText(txt,198,20);
      
    //Draw the current level
      
    ctx.font = "bold 18px arial";
    ctx.fillStyle= "#FFFFFF";
      
    var txt = "L:" + Game.currentLevel; 
      
      
    ctx.fillText(txt,135,20);
      
  };
};



Frog.prototype = new Sprite();


Frog.prototype.hit = function() {

  Game.lives--;   
    
  //Copy the most advanced position of the frog
  var backup = this.mostAdvancedPosition;

  this.board.remove(this);
    
  this.board.add(new Death(this.x + this.w/2, 
                                   this.y + this.h/2));
    
  if(Game.lives == 0){
    loseGame();   
  }
  else{
      
      var f = new Frog(Game.lives);
      f.mostAdvancedPosition = backup;
      this.board.add(f);
  } 
    
  //Game.points += this.points || 100;
  //this.board.add(new Explosion(this.x + this.w/2, 
  //                             this.y + this.h/2));

};

Frog.prototype.onTrunk = function(vTrunk) {

  
  //The overTrunk flag is updated
  this.overTrunk = true;
    
  this.vx = vTrunk;
    
  //console.log("Velocity of the frog: " + vTrunk);
  //Game.points += this.points || 100;
  //this.board.add(new Explosion(this.x + this.w/2, 
  //                             this.y + this.h/2));

};

var Car = function(blueprint,override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite,blueprint);
  this.merge(override);
    
  this.y = Game.height - 48 - override.f * 48;
};

Car.prototype = new Sprite();
Car.prototype.type = OBJECT_ENEMY;

Car.prototype.baseParameters = { x: 0,   y: 0, sprite: 'car1', v: 0, d: 'left' };

Car.prototype.step = function(dt) {

  //Position recalculation
    
  if(this.d == 'left'){
    this.x -= this.v * dt;
  }
  else{
    this.x += this.v * dt;
  }

};

Car.prototype.hit = function() {

  this.board.remove(this);
  //Game.points += this.points || 100;
  //this.board.add(new Explosion(this.x + this.w/2, 
  //                             this.y + this.h/2));

};

var Trunk = function(blueprint,override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite,blueprint);
  this.merge(override);
    
  if(this.v > 0){
      this.x = -sprites[blueprint["sprite"]].w;
  }
  else{
      this.x = Game.width;
  }
    
  this.y = 48 + 48 * override.f;

};

Trunk.prototype = new Sprite();
Trunk.prototype.type = OBJECT_TRUNK;

Trunk.prototype.baseParameters = { x: 0,   y: 0, sprite: 'car1', v: 0, d: 'left' };

Trunk.prototype.step = function(dt) {

  //Position recalculation
  this.x += this.v * dt;

};

var Water = function() {
    
  this.x = 0;
  this.y = 96;
    
  //Adjust here the width and height of the water (not with setup)
  this.w = Game.width;
  this.h = 144; 
  /*
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite,blueprint);
  this.merge(override);
  */
};

Water.prototype = new Sprite();
Water.prototype.type = OBJECT_ENEMY;

Water.prototype.step = function(dt) {};

Water.prototype.draw = function(ctx) {};

Water.prototype.hit = function() {};


var Death = function(centerX,centerY) {

  this.count = 0; //To slower animation
  this.setup('death', { frame: 0 });
  this.x = centerX - this.w/2;
  this.y = centerY - this.h/2;
};

Death.prototype = new Sprite();

Death.prototype.step = function(dt) {
  this.count++;
    
  if(this.count % 8 == 0){
      this.frame++;
  }

  if(this.frame >= 4 ) {
    this.board.remove(this);
      
    //Add the lose screen
    //Game.setBoard(2,new TitleScreen("YOU LOOSE", "Press space to start playing",playGame));
  }
                                    
};

var Home = function() {
    
  this.x = 0;
  this.y = 48;
    
  //Adjust here the width and height of the water (not with setup)
  this.w = Game.width;
  this.h = 48; 
  /*
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite,blueprint);
  this.merge(override);
  */
};

Home.prototype = new Sprite();
Home.prototype.type = OBJECT_GOAL;

Home.prototype.step = function(dt) {};

Home.prototype.draw = function(ctx) {};

Home.prototype.hit = function() { nextLevel();};

/*
var Level = function(levelData,callback) {
    

};

Level.prototype = new Sprite();

Level.prototype.draw = function(ctx) {};

Level.prototype.step = function(dt) {

};
*/

//Time must be in miliseconds
var Level = function(levelData,callback){
    
    this.levelData = [];
    
    for(var i = 0; i < levelData.length; i++) {
        
        this.levelData.push(Object.create(levelData[i]));
    }
    
    this.t = 0;
    
    this.callback = callback;
  
};

Level.prototype = new Sprite();

Level.prototype.step = function(dt) {
    
    var idx = 0, curShip = null;
    
    // Update the current time offset
    this.t += dt * 1000;
    
    // Example levelData
    // Start, Gap, Type, Override
    // [[ 0,, 500, 'trunk', { f: 2,v:40 } ]
    while(curShip = this.levelData[idx]) {
        
        if(curShip[0] < this.t) {

            // Get the enemy definition blueprint
            //var car = enemies[curShip[2]],
            override = curShip[3];
            
            if(curShip[2] == 'trunk'){
                var obj = allies[curShip[2]];   
                
                this.board.add(new Trunk(obj,override));
            }
            else if(curShip[2] == 'snake'){
                var obj = enemies[curShip[2]];   
                
                this.board.add(new Snake(obj,override));
            }
            else if(curShip[2] == 'insect'){
                var obj = enemies[curShip[2]];   
                
                this.board.add(new Insect(obj,override));
            }
            else{
                var obj = enemies[curShip[2]];  
                
                this.board.add(new Car(obj,override));
                
            }

            // Increment the start time by the gap
            curShip[0] += curShip[1];
        }

        idx++;
    }

};

Level.prototype.draw = function(ctx) {};

var Snake = function(blueprint,override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite,blueprint);
  this.merge(override);
    
  this.count = 0; 
};

Snake.prototype = new Sprite();
Snake.prototype.type = OBJECT_ENEMY;

Snake.prototype.baseParameters = { x: 0,   y: 0, sprite: 'snake', v: 0 };

Snake.prototype.step = function(dt) {

  //Position recalculation
    
  if((this.x > Game.width - this.w)||(this.x < 0)){
    this.v = -this.v;  
  }

    
  this.x -= this.v * dt;
    
  //Animation
  this.count++;
    
  if(this.count % 15 == 0){
      this.frame++;
  }

  if(this.frame >= 3 ) {
    //this.board.remove(this);
      
    this.count = 0;
    this.frame = 1;
  }
    
};

Snake.prototype.draw = function(ctx) {
    

  
    if(this.v > 0){
          SpriteSheet.draw(ctx,this.sprite,this.x,this.y,this.frame);
    }
    else{

    
          SpriteSheet.draw(ctx,this.sprite,this.x,this.y,this.frame);
    

    }
    
};

Snake.prototype.hit = function(){
    
};

var Insect = function(blueprint,override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite,blueprint);
  this.merge(override);
};

Insect.prototype = new Sprite();
Insect.prototype.type = OBJECT_INSECT;

Insect.prototype.baseParameters = { zIndex: 0, x: 0,   y: 0, sprite: 'insect', v: 0 };

Insect.prototype.step = function(dt) {

  //Position recalculation
    
  if((this.x > Game.width - this.w)||(this.x < 0)){
    this.v = -this.v;  
  }

    
  this.x -= this.v * dt;
    
};

Insect.prototype.draw = function(ctx) {
    

  
    if(this.v > 0){
          SpriteSheet.draw(ctx,this.sprite,this.x,this.y,this.frame);
    }
    else{

    
          SpriteSheet.draw(ctx,this.sprite,this.x,this.y,this.frame);
    

    }
    
};


Insect.prototype.hit = function(){
    Game.points += this.points || 10;
};








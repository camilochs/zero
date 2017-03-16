/**

Autor: Camilo Chacón Sartori. 2015

**/


var Q = Quintus().include("Sprites, Scenes, Input, 2D, Anim, UI")
                 .setup("game")
                 .controls();

Q.Sprite.extend("Rex",{

  init: function(p) {

    this._super(p,{
      sheet: "rex",
      sprite: "rex", 
      x: 60,
      vy: 0,
      vx: 0,
      scale: 0.4
       });
    this.moveProperties = { 
          event: "",
          lastPos: { x:50, y:450},
          extra: 90,
          count: 0,
          jumpPower: 300,
          speed: 2 };

    this.add("2d, animation");


    this.on("_idle",this,"idleEvent");

    this.on("hit.sprite",function(collision) {
       if(collision.obj.isA("Coin")) {

          this.moveProperties.event = "end";
          $('#ModalWinLevel1').modal('show');

          commandsTimeout.forEach(function(o){
            clearTimeout(o);
          });

          commandsTimeout.push("win");

          globalVar();
          collision.obj.destroy();
      }else if(collision.obj.isA("Box")){ //level 2
        
        //this.moveProperties.event = "";
      }

    });
  },

  step: function(dt) {

    if(this.p.y >= 360){
      this.p.vy = 0;
      this.p.vx = 0;
      this.p.y = 360;
    
    }

    if(this.moveProperties.event == "rightMove" 
      && (this.moveProperties.lastPos.x + 90 > this.p.x 
      && this.moveProperties.lastPos.x + 90  < Q.width )){
      this.p.x += this.moveProperties.speed;
      this.play("run");
    }else if(this.moveProperties.event == "leftMove" 
      && (this.moveProperties.lastPos.x - this.moveProperties.extra < this.p.x
      &&  this.moveProperties.lastPos.x - 90 > 0)){
      this.p.x -= this.moveProperties.speed;
      this.play("run");
    }else if(this.moveProperties.event == "attack"){

      this.play("attack");
    }else if(this.moveProperties.event == "attackToBox"){

      //this.p.x += 2;

      this.play("attack");
      this.p.vy = -400;
       this.p.x += this.moveProperties.speed;
    }else if(this.moveProperties.event == "jump" &&
      (this.p.y > 355 - 10 )){

      this.p.vy = -this.moveProperties.jumpPower;
      this.play("jump");
    }else{
      this.moveProperties.event = "";
      this.moveProperties.lastPos.y = this.p.y;
      this.moveProperties.lastPos.x = this.p.x;
      this.play("idle");

    }
  },
  checkFrontBox: function(){
    
    if((box.p.x - this.p.x) > 100){//no esta cerca
      return false;
    }
    this.moveProperties.event = "";
    return true;
  },
  idleEvent: function(){
    this.moveProperties.event = "";

  }, 
  leftMove: function(){
    if(this.p.x > 40){ 
      this.moveProperties.event = "leftMove";
    }else{
      this.p.x = 20;
      this.moveProperties.event = "";
      
    }
    
  },
  rightMove: function(){
    if(this.p.x > 400){
      this.p.x = 400;
      this.moveProperties.event = "";
      this.moveProperties.count = 0;
    }else{
      this.moveProperties.event = "rightMove";
      this.moveProperties.count++;
    } 
  },
  attackMove: function(){
    this.moveProperties.event = "attack";
  },
  jumpMove: function(){
    this.moveProperties.event = "jump";
  },
  attackToBoxMove: function(){//level2
    if((box.p.x - this.p.x) < 100 && !box.isDestroyed){
      //box.destroy();
      this.moveProperties.event = "attackToBox";

      box.play("broken");
    }
  },
  setJumpPower: function(power){
    switch(power){
      case "low":
        this.moveProperties.jumpPower = 300;
        break;
      case "normal":
        this.moveProperties.jumpPower = 500;
        break;
      case "hard":
        this.moveProperties.jumpPower = 700;
        break;
    }

  },
  setSpeedPower: function(power){

    switch(power){
      case "slow":
        this.moveProperties.speed = 1;
        break;
      case "normal":
        this.moveProperties.speed = 2;
        break;
      case "fast":
        this.moveProperties.speed = 5;
        break;
    }

  }
    
});

Q.Sprite.extend("Cloud",{
  init: function() {

    var cloudAssets = ["cloud1.png", "cloud2.png", "cloud3.png"];

    var rex = Q("Rex").first();
    this._super({
      x: Q.width + 50,
      y: (100 * Math.random() + 40) ,
      frame: 0,
      scale: 1,
      type: 1,
      asset: cloudAssets[Math.floor((Math.random()* 2) +0)],
      vx: -30 + 10 * Math.random(),
      vy: 0,
      ay: 0,
      theta: (300 * Math.random() + 200) * (Math.random() < 0.5 ? 1 : -1)
    });
    this.on("hit");
  },

  step: function(dt) {
    this.p.x += this.p.vx * dt;
    this.p.vy += this.p.ay * dt;
    this.p.y += this.p.vy * dt;
    if(this.p.y != 565) {
      //this.p.angle += this.p.theta * dt;
    }

    if(this.p.x < -100) { this.destroy(); }

  }

});
Q.GameObject.extend("CloudAnimations",{
  init: function() {
    this.p = {
      launchDelay: 15,
      launchRandom: 1,
      launch: 1
    }
  },

  update: function(dt) {
    this.p.launch -= dt;

    if(this.p.launch < 0) {
      this.stage.insert(new Q.Cloud());
      this.p.launch = this.p.launchDelay + this.p.launchRandom * Math.random();
    }
  }

});

Q.Sprite.extend("Coin", {
  init: function(p) {
    this._super(p, { 
      sheet: 'coin'
    });
  }
});
Q.Sprite.extend("Box", {
  init: function(p) {

    this._super(p, { 
      frame:0,
      sheet: 'box',
      sprite: "box",
      scale: 0.7, 
      repeatY: false,
      repeatX: false,
      x: 190,
      y: 0,
      vy: 0,
      vx: 0
    });
    this.add("2d, platformerControls, animation");


    this.on("_brokenFinish",this,"brokenFinish");
    this.on("hit.sprite",function(collision) {
    });
    
  },  step: function(dt) {
    this.p.vy = 0;
    this.p.vx = 0;
    this.p.x = 235;
    this.p.y = 375;
   // this.play("broken");
    
  },
  brokenFinish:function(){
    this.destroy();
  }
});
var rex, box = null;
Q.scene("level1",function(stage) {

    stage.insert(new Q.Repeater({ asset: "bg.png",
                                  speedX: 0.5 }));

    stage.insert(new Q.Repeater({ asset: "grassHalfMid.png",
                                  repeatY: false,
                                  speedX: 1.0,
                                  y: 200 }));
    stage.insert(new Q.Repeater({ asset: "grassCenter.png",
                                  repeatY: false,
                                  speedX: 1.0,
                                  y: 220 }));
    
    stage.insert(new Q.Repeater({ asset: "cactus.png",
                                  repeatY: false,
                                  repeatX: false,
                                  y: 165,
                                  x: 85 }));
    stage.insert(new Q.Repeater({ asset: "plant.png",
                                  repeatY: false,
                                  repeatX: true,
                                  y: 165,
                                  x:90 }));
   
   /* 
  stage.insert(new Q.Repeater({ asset: "coinGold.png",
                                  repeatY: false,
                                  repeatX: false,
                                  y: 125,
                                  x: 150 }));
    */
    stage.insert(new Q.CloudAnimations());

    stage.insert(new Q.Coin({ repeatY: false, repeatX: false, x: 270, y: 200 }));
    rex = new Q.Rex();
    stage.insert(rex);
    //stage.insert(new Q.Player());
    stage.add("viewport");

  });
Q.scene("level2",function(stage) {

    stage.insert(new Q.Repeater({ asset: "bg.png",
                                  speedX: 0.5
                                 }));
    stage.insert(new Q.Repeater({ asset: "bg2.png",
                                  y: 150,
                                scale:1.3,repeatX: false }));

    stage.insert(new Q.Repeater({ asset: "grass1.png",
                                  repeatY: false,
                                  speedX: 1.0,
                                  y: 190 }));
    
   
   /* 
  stage.insert(new Q.Repeater({ asset: "coinGold.png",
                                  repeatY: false,
                                  repeatX: false,
                                  y: 125,
                                  x: 150 }));
    */
    stage.insert(new Q.CloudAnimations());
    box = new Q.Box();
    stage.insert(box);
    stage.insert(new Q.Coin({ repeatY: false, repeatX: false, x: 320, y: 350 }));
    rex = new Q.Rex();
    stage.insert(rex);

    //stage.insert(new Q.Player());
    stage.add("viewport");

  });
  Q.scene("endGame",function(stage) {
  
    stage.insert(new Q.Repeater({ asset: "bg.png",
                                  speedX: 0.5 }));

    stage.insert(new Q.Repeater({ asset: "grassHalfMid.png",
                                  repeatY: false,
                                  speedX: 1.0,
                                  y: 200 }));
                                  
    stage.insert(new Q.Repeater({ asset: "grassCenter.png",
                                  repeatY: false,
                                  speedX: 1.0,
                                  y: 220 }));
    
    stage.insert(new Q.Repeater({ asset: "cactus.png",
                                  repeatY: false,
                                  repeatX: false,
                                  y: 165,
                                  x:30 }));
    stage.insert(new Q.Repeater({ asset: "plant.png",
                                  repeatY: false,
                                  repeatX: true,
                                  y: 165,
                                  x:90 }));
   
   /* 
  stage.insert(new Q.Repeater({ asset: "coinGold.png",
                                  repeatY: false,
                                  repeatX: false,
                                  y: 125,
                                  x: 150 }));
    */
    stage.insert(new Q.CloudAnimations());
    //stage.insert(new Q.Player());
    stage.insert(new Q.UI.Text({
      x: Q.width/2, 
      y: Q.height/2,
      label: stage.options.label
    }));

    stage.add("viewport");
  });



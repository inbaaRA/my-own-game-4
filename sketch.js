var database;
var back_img;
var gameState = 0;
var playerCount = 0;
var allPlayers;
var score = 0;
var player, form, game;
var player1,player2,player3,player4;
var players;
var choco;
var chocoGroup;
var choco1_img, choco2_img, choco3_img, choco4_img, choco5_img;
var player_img;
var player1score = 0;
var player2score = 0;
var player3score = 0;
var player4score = 0;
var distance;
var title;
var bg2;
var horizontal;
var chocolates;
var endImage;
var endSound;
var touchSound;
var cong;

function preload(){
  back_img = loadImage("c bg3.jpeg");
  player_img = loadImage("player/boy5.png");
  player2_img = loadImage("player/boy3.png");
  player3_img = loadImage("player/boy4.png");
  player4_img = loadImage("player/boy6.png");

  choco1_img = loadImage("chocolate/chocolate.png");
  choco2_img = loadImage("chocolate/chocolate1.png");
  choco3_img = loadImage("chocolate/chocolate2.png");
  choco4_img = loadImage("chocolate/chocolate3.png");
  choco5_img = loadImage("chocolate/chocolate4.png");

  endImage = loadImage("end.jpg");

  chocoGroup = new Group();

  title = loadImage("title.png");
  bg2 = loadImage("c bg.jpeg");

  endSound = loadSound("endSound.mp3");
  touchSound = loadSound("touch.mp3");

  cong = loadImage("cong.jpeg");
}
function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(back_img);
  if(gameState === 0){
    image(title, 200,100,600,70);
  }
  if(gameState === 1){
    clear();
    game.play();
    endSound.play();
    textSize(30);
     text(mouseX +","+mouseY,mouseX,mouseY);
  }
  if(gameState === 2){
    game.end(); 
  }
  if(playerCount === 4){
    game.update(1);
  }

}
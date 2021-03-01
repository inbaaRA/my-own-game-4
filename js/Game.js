    class Game{
        constructor(){

        }
        getState() {
            var gameStateRef = database.ref('gameState');
            gameStateRef.on("value", function (data) {
                gameState = data.val();
            })

        }

        update(state){
            database.ref('/').update({
                gameState: state
            });
        }

        async start() {

                if (gameState === 0) {
                    player = new Player();
                    var playerCountRef = await database.ref('playerCount').once("value");
                    if (playerCountRef.exists()) {
                        playerCount = playerCountRef.val();
                        player.getCount();
                    }
                    form = new Form()
                    form.display();
                }
                        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);
        player1.scale = 0.3;

        player2 = createSprite(400,500);
        player2.addImage("player2", player2_img);
        player2.scale = 0.4;

        player3 = createSprite(600,500);
        player3.addImage("player3", player3_img);
        player3.scale = 0.4;

        player4 = createSprite(800,500);
        player4.addImage("player4", player4_img);
        player4.scale = 0.4;

        players=[player1,player2,player3,player4];

            }
        
        play(){
            
            form.hide();        

            Player.getPlayerInfo();     
            if(allPlayers !== undefined){
                background(bg2);
                var index = 0;

                //x and y position of the cars
                var x = 20;
                var y ;
        
                for(var plr in allPlayers){
                //add 1 to the index for every loop
                index = index + 1 ;
               // allPlayers[plr].horizontal += 0;
                //allPlayers[plr].distance += 500;
                //position the players a little away from each other in x direction
                x = 20+(index*250)+allPlayers[plr].horizontal;
                //use data form the database to display the players in y direction
                y = displayHeight - allPlayers[plr].distance;
                players[index-1].x = x;
                players[index-1].y = y;                
                players[index-1].depth -= 1;
               
                if(index === player.index){
                    fill("orange");
                    textSize(25);
                    text(player.name ,x-25,y-130);
                    text(player.score,x-15,y-100);
                }

                //fill("white");
                //textSize(25);
                //text("Score =",20,50);
                //text(allPlayers["player1"].name +"= "+ allPlayers["player1"].score,20 ,90)
                //text(allPlayers["player2"].name +"= "+ allPlayers["player2"].score,20 ,125)

            
                }
        }
            // Give movements for the players using arrow keys
                if(keyIsDown(UP_ARROW) && player.index !== null){
                player.distance +=10
                player.update();
            }

            if(keyIsDown(DOWN_ARROW) && player.index !== null){
                player.distance -=10
                player.update();
            }
            if(keyIsDown(LEFT_ARROW) && player.index !== null){
                player.horizontal -=10
                player.update();
            }

            if(keyIsDown(RIGHT_ARROW) && player.index !== null){
                player.horizontal +=10
                player.update();
            }
            if(frameCount % 60 === 0){
                chocolates = createSprite(random(100, 1000),0,100,100);
                chocolates.velocityY = 6;
                
                var rand = Math.round(random(1,5))
                switch (rand){
                    case 1:chocolates.addImage("fruit1",choco1_img);
                    break;
                    case 2:chocolates.addImage("fruit1",choco2_img);
                    break;
                    case 3:chocolates.addImage("fruit1",choco3_img);
                    break;
                    case 4:chocolates.addImage("fruit1",choco4_img);
                    break;
                    case 5:chocolates.addImage("fruit1",choco5_img);
                    break;
                }
                chocolates.scale = 0.3;
                chocoGroup.add(chocolates); 
            }
            
            if(player.index !== null){
                for(var i = 0; i< chocoGroup.length; i++){
                    if(chocoGroup.get(i).isTouching(players)){
                        chocoGroup.get(i).destroy();
                        player.score += 1
                        touchSound.play();
                        player.update();
                    }
                }
            }
            if(player.score>=10){
                game.update(2);
            }
            drawSprites();
            }
            
        end(){
            
            background(cong);
         //  textSize(35);
         //   fill("yellow");
         //   text("Game Over, Good Luck Next Time",450,300);
        console.log("Game Ended");
        }
    }
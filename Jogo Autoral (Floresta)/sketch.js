var player, playerImg, leao, leaoImg, moeda, moedaImg, arvore, arvoreImg, passaro, passaroImg;
var START = 0
var PLAY = 1
var END = 2
var gameState = START 
var placar
var pontos = 0
var fundo_imagem
var grupoMoedas, grupoArvores, grupoPassaros;
var chao
var player_parado
var fundo

function preload() {
    playerImg = loadImage("player.gif")
    leaoImg = loadImage("leao.png")
    moedaImg = loadImage("moeda.png")
    arvoreImg = loadImage("arvore.png")
    passaroImg = loadImage("passaro.png")
    fundo_imagem = loadImage("background.png")
    player_parado = loadImage("player-3.png.png")
}

function setup() {
    createCanvas(1000,600)

    fundo = createSprite(500,280,1000,600)
    fundo.addImage("fundo_imagem", fundo_imagem)
    fundo.scale = 2.2
    player = createSprite(240,450,40,40) 
    leao = createSprite(-40,450,40,40)
    player.addImage("playerImg", playerImg)
    player.addImage("player_parado", player_parado)
    player.scale = 6
    player.debug = false
    player.setCollider("rectangle",0.5,-2,10,14)
    leao.addImage("leaoImg", leaoImg)
    leao.scale = 2
    grupoMoedas = new Group()
    grupoArvores = new Group()
    grupoPassaros = new Group()
    chao = createSprite(500,480,1000,5)
    chao.visible = false
    


}

function draw() {
    background("white")

    player.collide(chao)
    player.velocityY += 0.4

    drawSprites()

    console.log(frameCount)
    
    if (gameState == START) {

      if (leao.x < 150){
        leao.velocityX = 2.5
      } else {
        leao.velocityX = 0
      }

      player.changeImage("player_parado")

      fill("white")
      textSize(40)
      text("Corra do Leão para chegar até o final", 110, 250)
      fill("white")
      textSize(30)
      text("Controle o jogador com as setas do teclado", 150, 300)

      if (leao.x == 120) {
        gameState = PLAY
      } 

    } else if (gameState == PLAY) {
    
      player.changeImage("playerImg")
      leao.velocityX = 0

      fundo.velocityX = -3

      if (fundo.x < -150) {
        fundo.x = 500
      }
      
      spawnArvores()
      spawnMoedas()
      spawnPassaros()

      if (keyDown(UP_ARROW) && player.y > 370) {
        player.velocityY = -10 
      }
  
      if (keyWentDown(DOWN_ARROW)) {
        player.setCollider("rectangle",0.5,0.8,10,7)
      }
  
      if(keyWentUp(DOWN_ARROW)) {
        player.setCollider("rectangle",0.5,-2,10,14)
      }

      if(grupoArvores.isTouching(player) || grupoPassaros.isTouching(player)){  
        gameState = END
      }
  
      if(player.overlap(grupoMoedas, coletar_moedas)) {
        pontos += 50
        
      }

      if(frameCount % 50 === 0) {
        pontos += 10
      }

      if (frameCount < 5000) {
        grupoArvores.setVelocityXEach(-(3 + frameCount / 1000))
        grupoPassaros.setVelocityXEach(-(3 + frameCount / 1000))
      }


    } else {

      player.velocityX = 0
      leao.velocityX = 2.5
      grupoArvores.setVelocityXEach(0)
      grupoMoedas.setVelocityXEach(0)
      player.changeImage("player_parado")
      fundo.velocityX = 0

      if(leao.collide(player)) {
        leao.velocityX = 0
        
        fill("white")
        textSize(60)
        text("GAME OVER", 330,300)

      }

      grupoArvores.setLifetimeEach(-1)
      grupoPassaros.setLifetimeEach(-1) 
      grupoMoedas.setLifetimeEach(0)

    }

    fill("black")
    textSize(20)
    text("Pontos:" + pontos, 50, 50)

}

function spawnArvores() {
    if (frameCount % 140 === 0) {
      arvore = createSprite(1000,450,40,10);
      arvore.addImage(arvoreImg);
      arvore.scale = 1
      arvore.velocityX = -(3);
      arvore.lifetime = 400;
      
      arvore.depth = player.depth;
      player.depth = player.depth + 1;
      
      grupoArvores.add(arvore);

      arvore.debug = true
    }
    
  }

  function spawnPassaros() {
    if (frameCount % 140 === 0) {
      passaro = createSprite(1200,400,40,10);
      passaro.addImage(passaroImg);
      passaro.scale = 1
      passaro.velocityX = -3;
      
      passaro.lifetime = 400;
      
      passaro.depth = player.depth;
      player.depth = player.depth + 1;
      
      grupoPassaros.add(passaro);

      passaro.debug = true
      passaro.setCollider("rectangle", 0,0,25,35)
    }
    
  }

  function spawnMoedas() {
    if (frameCount % 60 === 0) {
      moeda = createSprite(1000,350,40,10);
      moeda.addImage(moedaImg);
      moeda.scale = 1
      moeda.velocityX = -3;
      
      moeda.lifetime = 400;
      
      moeda.depth = player.depth;
      player.depth = player.depth + 1;
      
      grupoMoedas.add(moeda);

      moeda.debug = true
    }
    
  }

function coletar_moedas(player, moeda) {
  moeda.destroy()
}
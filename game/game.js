// Linted with standardJS - https://standardjs.com/

// Initialize the Phaser Game object and set default game window size
const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
})




let platforms
let player
let cursors
let arrow
let rock

// laden van de ingame assets
function preload() {
  game.load.image('bg', 'assets/bg3.png')
  game.load.image('ground', 'assets/platform.png')
  game.load.image('wallL', 'assets/wall1.png')
  game.load.image('wallR', 'assets/wall2.png')
  game.load.image('roof', 'assets/roof.png')
  game.load.spritesheet('runningR', 'assets/runningLR.png', 64, 64)
  game.load.spritesheet('jump', 'assets/jumping.png', 64, 64)
  game.load.image('arrow', 'assets/arrow.png', 64, 64)
  game.load.image('rock', 'assets/rock.png', 64, 64)
}

function create() {
  //aanzetten van ingame physics
  game.physics.startSystem(Phaser.Physics.ARCADE)

  //inladen achtergrond
  game.add.sprite(0, 0, 'bg')

  //platform groep aanmaken
  platforms = game.add.group()
  platforms.enableBody = true


  //maken van de vloer
  let ground = platforms.create(0, game.world.height - 64, 'ground')
  ground.scale.setTo(1, 1)
  ground.body.immovable = true
  //maken van de linker muur
  let wallL = platforms.create(0, 0, 'wallL')
  ground.scale.setTo(1, 1)
  wallL.body.immovable = true
  //maken van de rechter muur
  let wallR = platforms.create(736, 0, 'wallR')
  ground.scale.setTo(1, 1)
  wallR.body.immovable = true
  //maken van het plafond
  let roof = platforms.create(0, 0, 'roof')
  ground.scale.setTo(1, 1)
  roof.body.immovable = true

  // maken van de player
  player = game.add.sprite(368, game.world.height - 130, 'runningR')
  game.physics.arcade.enable(player)
  player.body.bounce.y = 0, 2
  player.body.gravity.y = 800
  player.body.collideWorldBGounds = true


  //maken van de animaties
  player.animations.add('left', [7, 6, 5, 4, 3, 2, 1, 0], 10, true)
  player.animations.add('right', [8, 9, 10, 11, 12, 13, 14, 15], 10, true)
  player.animations.add('idle', [8], true)
  player.animations.add('jump', [0, 1, 2, 3], true)

  cursors = game.input.keyboard.createCursorKeys()

  // toevoegen horizontale pijlen
  arrows = game.add.group()
  arrows.enableBody = true

  //spawnen pijlen
  for (var i = 0; i < 4; i++) {
    let arrow = arrows.create(i * 225, 80, 'arrow')
    arrow.body.gravity.y = 600 + Math.random() * 1000
  }
  //herhalen van de functie arrowdrop
  game.time.events.repeat(Phaser.Timer.SECOND * 1, 1000, arrowdrop);
  // toevoegen horizontale stenen
  rocks = game.add.group()
  rocks.enableBody = true

  //spawnen stenen
  for (var i = 0; i < 10; i++) {
    let rock = rocks.create(i * game.world.randomX, 0, 'rock')
    rock.body.gravity.y = 600 + Math.random() * 1000
  }
  //herhalen van de functie rockdrop
  game.time.events.repeat(Phaser.Timer.SECOND * 1, 1000, rockdrop);

}

// functie die ervoor zorgt dat de pijlen worden gecreeerd
function arrowdrop() {

  arrows = game.add.group()
  arrows.enableBody = true

  for (var i = 0; i < 15; i++) {
    let arrow = arrows.create(i * game.world.randomX, 0, 'arrow')
    arrow.body.gravity.y = 600 + Math.random() * 1000
  }
}

// functie die ervoor zorgt dat de stenen worden gecreeerd
function rockdrop() {

  rocks = game.add.group()
  rocks.enableBody = true

  for (var i = 0; i < 3; i++) {
    let rock = rocks.create(i * game.world.randomX, 0, 'rock')
    rock.body.gravity.y = 800 + Math.random() * 1000
  }
}



function update() {
  //zorgt ervoor dat de speler stilstaat wanneer player en platforms elkaar raken
  game.physics.arcade.collide(player, platforms)
  player.body.velocity.x = 0
  //zorgt ervoor dat de functie hit2 & hit worden aangeroepen wanneer de speler een pijl of steen raakt
  game.physics.arcade.overlap(player, arrows, hit2, null, this)
  game.physics.arcade.overlap(player, rocks, hit, null, this)
  //movement van de speler wanneer er op links en rechts wordt gedrukt of geen toets
  if (cursors.left.isDown) {
    player.body.velocity.x = -225
    player.animations.play('left')
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 225
    player.animations.play('right')
  } else {
    player.animations.play('idle')
  }
  // dat de speler omhoog (springen) wanneer er op omhoog wordt gedrukt
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -500
    player.animations.play('jump')
  }



}

// functie die de melding you dead aanroept
function hit() {
  alert("You dead")

}
// functie die de melding you dead aanroept
function hit2() {
  alert("You dead")

}



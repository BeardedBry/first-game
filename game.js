import Phaser from 'phaser';
import images from './assets/*.png'; 

class mainScene {

    preload(){
        this.load.image('player', images.player);
        this.load.image('coin', images.coin);
    }

    create(){
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.coin = this.physics.add.sprite(300, 300, 'coin');
        
        // Score Text
        this.score = 0;
        let style = { font: '20px Arial', fill: '#fff'};
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
        
        // Input
        this.arrow = this.input.keyboard.createCursorKeys();
        
        this.spawnedEnemy = false;

        this.physics.add.overlap(this.player, this.coin, this.hit, null, this);
        this.physics.add.overlap(this.enemy, this.coin, this.hit, null, this); // this line breaks it.
    }
    
    spawnEnemy(){
        this.enemy = this.physics.add.sprite( -100, -100, 'player');
        this.enemy.setTint(0xff0000);
        console.log('enemy spanwed');
        this.enemy.x = 100;
        this.enemy.y = 100;
    }

    enemyFollow(){
        // make enemy follow the coin
        if(this.coin.x < this.enemy.x){
            this.enemy.x -= 3;
        }else{
            this.enemy.x += 3;
        }

        if(this.coin.y < this.enemy.y){
            this.enemy.y -= 3;
        }else{
            this.enemy.y += 3;
        }


    }

    hit(){
        // change coin position randomly
        this.coin.x = Phaser.Math.Between(100, 600);
        this.coin.y = Phaser.Math.Between(100, 300);
        // update score
        this.score += 10;
        this.scoreText.setText('score: ' + this.score);

        this.tweens.add({
            targets: this.player,
            duration: 200,
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo: true
        });
    }

    update(){

        // if(this.physics.overlap(this.player, this.coin)){
        //     this.hit();
        // }

        if (this.arrow.right.isDown) {
            this.player.x += 3;
        }
        if (this.arrow.left.isDown) {
            this.player.x -= 3;
        }

        if (this.arrow.down.isDown) {
            this.player.y += 3;
        }
        if (this.arrow.up.isDown) {
            this.player.y -= 3;
        }

        if(this.score >= 20 && this.spawnedEnemy === false ){
            this.spawnEnemy();
            this.spawnedEnemy = true;
        }

        if(this.spawnedEnemy){
            this.enemyFollow();
        }

    }
}


new Phaser.Game({
    type: Phaser.AUTO,
    width: 700,
    height: 400,
    backgroundColor: '#3498db',
    physics: {default: 'arcade'},
    scene: mainScene,
    parent: 'game',
});
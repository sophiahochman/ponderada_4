import { GameScene } from './jogo.js';

// Configurações do jogo Phaser
const config = {
    type: Phaser.AUTO,
    width: 850,
    height: 700,

    // Ativando a física no jogo
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },

    scene: [GameScene]
};

// Carrega as configurações do Phaser 
const game = new Phaser.Game(config);

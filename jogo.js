// Criar classe "GameScene"
export class GameScene extends Phaser.Scene {
    
    // Acrescentar array de plataformas
    plataformas = [];

    constructor() {
        super("GameScene");
    }

    // Adicionar preload
    preload() {
        this.load.image("bg", "assets/floresta.jpg");
        this.load.image("noz", "assets/noz-removebg-preview.png");
        this.load.image("esquilo", "assets/esquilo-removebg-preview.png");
        this.load.image("plataforma", "assets/image-removebg-preview copy - Copia.png");
        
    }

    // Criar elementos da tela do jogo
    create() {
        this.larguraJogo = this.sys.canvas.width; // Config phaser
        this.alturaJogo = this.sys.canvas.height; // Config phaser

        // Criar var pontuação
        this.pontuacao = 0;
        
        // Adicionar imagem de fundo
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "bg").setScale(1.5);

        // Adicionar esquilo
        this.player = this.physics.add.image(this.larguraJogo / 2, 100, "esquilo").setScale(0.5);
        this.player.setCollideWorldBounds(true); // Adiciona os limites
        this.player.body.setGravityY(300); // Adiciona gravidade

        // Adicionar plataformas 1 e 2, dimensão e marcação de colisão
        this.plataformas[0] = this.physics.add.staticImage(200, 450, "plataforma");
        this.plataformas[0].body.setSize(148, 44, true);
        this.plataformas[0].setScale(0.3);

        this.plataformas[1] = this.physics.add.staticImage(580, 360, "plataforma");
        this.plataformas[1].body.setSize(148, 44, true);
        this.plataformas[1].setScale(0.3);

        // Adicionar colisão das plataformas do array
        for (let i = 0; i < this.plataformas.length; i++) {
            this.physics.add.collider(this.player, this.plataformas[i]);
        }

        // Adicionar os controles do teclado
        this.cursor = this.input.keyboard.createCursorKeys();

        // Adicionar placar
        this.placar = this.add.text(50, 50, "Pontuação: " + this.pontuacao, { fontSize: "45px", fill: "#000000" });

        // Adicionar nozes
        this.noz = this.physics.add.sprite(this.larguraJogo / 3, 0, "noz");
        this.noz.setCollideWorldBounds(true);
        this.noz.setScale(0.2);
        this.physics.add.collider(this.noz, this.plataformas[0]);
        this.physics.add.collider(this.noz, this.plataformas[1]);

        // Quando o player encostar na noz
        this.physics.add.overlap(this.player, this.noz, () => {
            this.noz.setVisible(false); // Torna a noz invisível
            var posicaoNoz_X = Phaser.Math.RND.between(50, 650); // Posição aleatória no eixo X
            this.noz.setPosition(posicaoNoz_X, 100); // Define nova posição da noz
            this.pontuacao += 1; // Aumenta a pontuação
            this.placar.setText("Pontuação: " + this.pontuacao); // Atualiza a pontuação
            this.noz.setVisible(true); // Torna a noz visível
        });
    }

    update() {
        // Resetar velocidade antes de aplicar novas direções
        this.player.setVelocityX(0);

        // Movimentação para a esquerda
        if (this.cursor.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.setFlipX(true);
        }
        // Movimentação para a direita
        else if (this.cursor.right.isDown) {
            this.player.setVelocityX(160);
            this.player.setFlipX(false);
        }
        // Se nenhuma tecla for pressionada, ficar parado
        else {
            this.player.setVelocityX(0);
        }

        if (this.cursor.up.isDown) {
            this.player.setVelocityY(-400);
        }
    }
}

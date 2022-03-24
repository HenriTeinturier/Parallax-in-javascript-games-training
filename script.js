const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
// Variable vitese du jeu qui pourra varier. 
let gameSpeed = 8;
// let gameFrame =0;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'layer-5.png';

const slider = document.getElementById('slider');
slider.value = gameSpeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener('change', function(e) {
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value;
})

// // nous utilisons la même image deux fois 'lune deriière l'autre)
// // afin de commencer la seconde pendant que la 1ere termine...
// // ce qui permet d'avoir un scrolling sans coupure
// // la largeur de notre backgrounlayer = 2400px;
// let x = 0; // position de la premiere image // l'image prend fin à -2400
// let x2 = 2400;

//  nous créons une classe pour construire des obkets pour chaque backgroundlayer.
// ils auront tous des methodes ou proprietes identiques (width =2400) mais en aurons certaines différentes:
// gameSpeed par exemple différent pour chaque instance crée.
class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        // this.x2 = this.width; // on refactore pour ne plus utiliser x2 
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update(){
        this.speed = gameSpeed * this.speedModifier;
        // remise du layer à sa position de depart s'il arrive au bout
        // lors de la remise au début il faut prendre en compte this.x (position actuelle - gamespeed pour eviter le décallage ("crat de quelques pixels") entre deux layout identique consécutfs.)
        if(this.x <= -this.width) {
            this.x = 0;
        }
        // idem pour le 2eme layout identique
        // rappel: on utilise 2 layouts identiques à la suite afin de ne pas avoir de coupure entre la fin du passage du scroll du premier layout et le nouveau lancement suivant:
        // on a donc deux layout identiques qui scrollent l'un derrière l'autre en continu.
        // if(this.x2 <= -this.width) {
        //     this.x2 = this.width + this.x - this.speed;
        // }
        // a chaque update on diminue le x et x2 de 1 ou plusieurs pixels: ce qui crée le scrolling. Si on additionne cela aura un scroll dans l'autre sens.
        this.x = Math.floor(this.x - this.speed);
        // this.x2 = Math.floor(this.x2 - this.speed);
        // this.x = gameFrame * this.speed % this.width;

    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer1, 0.2); // 0.5 car je souhaite que ce layer aille à la moitié de la vitesse du jeu
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    })
    // gameFrame--;

    requestAnimationFrame(animate)

}
animate();